import * as fs from 'fs'

import * as torrentStream from 'torrent-stream'

import {statAsync} from './util'

const videoFileTypes = ['avi', 'mp4', 'mkv']

interface FileProgress {
    [filePath: string]: {done: number; totalSize: number}
}

class TorrentController {

    private readonly torrentStreamEngine: TorrentStream.TorrentEngine

    private files: TorrentStream.TorrentFile[] = []

    private fileProgress: FileProgress = {}

    private torrentMetadata: TorrentStream.TorrentMetadata

    constructor (magnetLink: string) {
        this.torrentStreamEngine = torrentStream(magnetLink)
        this.torrentStreamEngine.on('ready', async () => {
            this.files = this.torrentStreamEngine.files
                        .filter(file => videoFileTypes.includes(file.name.substr(file.name.length - 3)))
            this.torrentMetadata = this.torrentStreamEngine.torrent
            this.verifyFiles()
            console.log("TORRENT FILES:", this.torrentStreamEngine.files)
            console.log("FILES:", this.files[0])
            console.log(`FILE PROGRESS: ${this.fileProgress}`)
        })
        
    }

    public async verifyFiles () {
        for (const file of this.files) {
            const tmpFilePath = `/tmp/torrent-stream/${this.torrentStreamEngine.infoHash}/${file.path}`
            let tmpFileSize = 0
            try {
                const stats = await statAsync(tmpFilePath)
                tmpFileSize = stats.size
            } catch (e) {}
            this.fileProgress[file.path] = {
                done: tmpFileSize,
                totalSize: file.length
            }            
        }
    }

}

export function createTorrentController (magnetLink: string): TorrentController {
    return new TorrentController(magnetLink)
}
