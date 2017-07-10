import * as fs from "fs"
import * as path from "path"
import * as os from "os"

import * as torrentStream  from "torrent-stream"

import * as ui from "./ui"
import { createTorrentController } from "./torrent-controller"

export async function main() {

    ui.initUI()

    // const magnetLink = "magnet:?xt=urn:btih:FB9BE2362BBF6BDE95F64A5203421E920FA380A5&dn=Enemy+at+the+Gates+%282001%29+%5B720p%5D+%5BYTS.AG%5D&tr=udp%3A%2F%2Fglotorrents.pw%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fp4p.arenabg.ch%3A1337&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337"

    // const torrentController = await createTorrentController(magnetLink)
    // const files = torrentController.getFiles()
    // // const stream = torrentController.startDownloadingFile('')
    // console.log("FILES:", files)


    // const engine = torrentStream(magnetLink)



    // engine.on("ready", async () => {

    //     console.log("TORRENT:", engine.torrent)
    //     engine.files.forEach(file => console.log(`FILE: ${file.name}`))
    //     const videoFile = engine.files[0]
    //     const fileStream: fs.ReadStream = videoFile.createReadStream()
    //     const outFilePath = path.join(os.homedir(), videoFile.name)
    //     const outFileWriteStream = fs.createWriteStream(outFilePath)
    //     console.log(`VIDEO FILE LENGTH: ${videoFile.length}`)
    //     let downloaded = 0
    //     outFileWriteStream.on("open", async () => {
    //         fileStream.pipe(outFileWriteStream)
    //         fileStream.on("data", function logOnce () {
    //             console.log("GOT DATA")
    //             fileStream.removeListener("data", logOnce)
    //         })
    //         fileStream.on("data", (chunk: Buffer) => {
    //             // console.log("CHUNK:", chunk)
    //             console.log("SIZE:", chunk.length)
    //             downloaded += chunk.length
    //             console.log("DOWNLOADED:", downloaded)
    //         })
    //         fileStream.on("end", () => console.log("END"))
    //         engine.on("download", async (pieceIndex) => {
    //             console.log(`Downloaded piece ${pieceIndex}`)
    //             const outFileStats = await statAsync(outFilePath)
    //             // console.log(`SIZE: ${outFileStats.size}`)
    //         })
    //     })
    // })
}

main()