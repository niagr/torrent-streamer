import * as fs from 'fs'

import * as torrentStream from 'torrent-stream'

import * as util from './util'

const videoFileTypes = ['avi', 'mp4', 'mkv']

interface FileProgress {
    done: number;
    totalSize: number;
    fileStream?: fs.ReadStream;
}

interface FileProgressMap {
    [filePath: string]: FileProgress;
}

function engineIsReadyAsync (engine: TorrentStream.TorrentEngine): Promise<void> {
    return new Promise<void>((resolve) => engine.on('ready', () => resolve()))
}

class TorrentController {

    private readonly torrentStreamEngine: TorrentStream.TorrentEngine

    private files: TorrentStream.TorrentFile[] = []

    private fileProgress: FileProgressMap = {}

    private torrentMetadata: TorrentStream.TorrentMetadata

    constructor (magnetLink: string) {
        this.torrentStreamEngine = torrentStream(magnetLink)
    }

    /**
     * Initialise torrent controller. It is an error to call any other method of this class before calling this.
     */
    public async initAsync () {
        await engineIsReadyAsync(this.torrentStreamEngine)
        this.torrentMetadata = this.torrentStreamEngine.torrent
        this.files = this.torrentStreamEngine.files
                    .filter(file => videoFileTypes.includes(file.name.substr(file.name.length - 3)))
        await this.verifyFiles()
    }

    /**
     * init FileProgress objects for every file in this.files
     */
    private async verifyFiles () {
        for (const file of this.files) {
            const tmpFilePath = `/tmp/torrent-stream/${this.torrentStreamEngine.infoHash}/${file.path}`
            let tmpFileSize = 0
            try {
                const stats = await util.fs.statAsync(tmpFilePath)
                tmpFileSize = stats.size
            } catch (e) {}
            this.fileProgress[file.path] = {
                done: tmpFileSize,
                totalSize: file.length
            }     
        }
    }

    /**
     * Checks whether a file is in the torrent and a candidate for download
     * @param fileTorrentPath Initialise torrent controller. It is an error to call any other method of this class before calling this
     */
    private checkFileInTorrent (fileTorrentPath: string) {
        if (this.files.find(file => file.path === fileTorrentPath) && this.fileProgress[fileTorrentPath]) {
            return true // justo
        } else {
            throw new Error(`${fileTorrentPath} not found in torrent or is not a candidate for download`)
        }
    }

    /**
     * Get download progress of file
     * @param fileTorrentPath Path of file relative to torrent root
     */
    public getFileProgress (fileTorrentPath: string) {
        this.checkFileInTorrent(fileTorrentPath)
        const {done, totalSize} = this.fileProgress[fileTorrentPath]
        return {done, totalSize}
    }

    /**
     * Start or continue downloading file
     * @param fileTorrentPath Path of file relative to torrent root
     * @return A readable stream to the downloading file
     */
    private startDownloadingFile (fileTorrentPath: string): fs.ReadStream {
        this.checkFileInTorrent(fileTorrentPath)
        const file = this.files.find(file => file.path === fileTorrentPath) ! // checkFileInTorrent() verified assertion holds
        const fileProgress = this.fileProgress[fileTorrentPath]
        fileProgress.fileStream =  file.createReadStream() as fs.ReadStream
        return fileProgress.fileStream
    }

    public async startDownloadingFileTo(fileTorrentPath: string, destinationFilePath: string): Promise<fs.ReadStream> {
        const downloadReadStream = this.startDownloadingFile(fileTorrentPath)
        const destWriteStream = fs.createWriteStream(destinationFilePath)
        downloadReadStream.pipe(destWriteStream)
        const destReadStream = fs.createReadStream(destinationFilePath)
        return destReadStream
    }

    /**
     * Stop downloading file. Temp file still remains.
     * @param fileTorrentPath Path of file relative to torrent root
     */
    public stopDownloadingFile (fileTorrentPath: string) {
        this.checkFileInTorrent(fileTorrentPath)
        const fileProgress = this.fileProgress[fileTorrentPath]
        if (fileProgress.fileStream) {
            fileProgress.fileStream.destroy()
            delete fileProgress.fileStream
        } else {
            throw new Error(`${fileTorrentPath} is not currently downloading`)
        }
    }

    /**
     * Stops downloading all currently downloading files
     */
    public stopDownloadingAllFiles () {
        for (const [filePath, fileProgress] of Object.entries(this.fileProgress)) {
            if (fileProgress.fileStream) {
                fileProgress.fileStream.destroy()
                delete fileProgress.fileStream
            } else {
                continue
            }
        }
    }

    /**
     * Get files that are candidates for downloading as an array of paths relative to the torrent root
     */
    public getFiles (): string[] {
        return Object.keys(this.fileProgress)
    }

}


/**
 * TorrentController singleton
 */
let torrentController: TorrentController|null = null;


/**
 * Returns a promise that resolves to the TorrentController singleton.
 * initAsync() will have already been called on this and is ready to use.
 * Multiple calls to this functions will return the same instance.
 * @param magnetLink magnet link for the torrent.
 */
export async function createTorrentController (magnetLink: string): Promise<TorrentController> {
    if (torrentController) {
        return torrentController
    } else {
        torrentController = new TorrentController(magnetLink)
        await torrentController.initAsync()
        return torrentController
    }
}
