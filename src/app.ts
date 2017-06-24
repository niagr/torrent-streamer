import * as fs from "fs"
import * as path from "path"
import * as os from "os"

import * as torrentStream from "torrent-stream"

async function openFileAsync(path: string): Promise<number> {
    return new Promise<number>((resolve, reject) => fs.open(path, "w", (err, fd) => err ? reject(err) : resolve(fd)))
}


export function main() {
    const magnetLink = "magnet:?xt=urn:btih:A0DF264C995A009B422E61D3EBFAB9FFFBF12AD1&dn=Batman%20v%20Superman%3A%20Dawn%20of%20Justice%20%282016%29%20%5B720p%20%5D&tr=%2audp%3a%2f%2fopen.demonii.com%3a1337%2fannounce&tr=udp%3a%2f%2ftracker.openbittorrent.com%3a80%2fannounce&tr=udp%3a%2f%2fglotorrents.pw%3a6969%2fannounce&tr=udp%3a%2f%2fp4p.arenabg.com%3a1337&tr=udp%3a%2f%2ftracker.leechers-paradise.org%3a6969&tr=udp%3a%2f%2ftracker.coppersurfer.tk%3a6969&tr=udp%3a%2f%2ftorrent.gresille.org%3a80%2fannounce&tr=udp%3a%2f%2ftracker.opentrackr.org%3a1337%2fannounce&tr=udp%3a%2f%2ftracker.internetwarriors.net%3a1337&tr=udp%3a%2f%2fexodus.desync.com%3a6969&tr=udp%3a%2f%2ftracker.coppersurfer.tk%3a6969&tr=udp%3a%2f%2ftracker.coppersurfer.tk%3a6969&tr=udp%3a%2f%2ftracker.internetwarriors.net%3a1337&tr=udp%3a%2f%2ftracker.internetwarriors.net%3a1337&tr=udp%3a%2f%2ftracker.leechers-paradise.org%3a6969&tr=udp%3a%2f%2ftracker.openbittorrent.com%3a80&tr=udp%3a%2f%2ftracker.openbittorrent.com%3a80&tr=udp%3a%2f%2f9.rarbg.me%3a2710%2fannounce"

    const engine = torrentStream(magnetLink)

    engine.on("ready", async () => {
        engine.files.forEach(file => console.log(`FILE: ${file.name}`))
        const videoFile = engine.files[1]
        const fileStream: fs.ReadStream = videoFile.createReadStream()
        // console.log("STREAM:", fileStream)
        const outFileWriteStream = fs.createWriteStream(path.join(os.homedir(), "downloading.mp4"), {
            flags: "w"
        })
        outFileWriteStream.on("open", () => {
            fileStream.pipe(outFileWriteStream)
            fileStream.on("data", () => console.log("GOT DATA"))
        })
    })
}
