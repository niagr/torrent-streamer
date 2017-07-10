import * as fs from 'fs'
import * as os from 'os'

import * as React from "react"
import * as ReactDOM from "react-dom"


import { createTorrentController } from './torrent-controller'
import HelloWorld from "./components/App"

async function main () {

    const appContainer = document.getElementById("app")
    ReactDOM.render(<div>Hello React!<HelloWorld/></div>, appContainer)

    const magnetLink = "magnet:?xt=urn:btih:FB9BE2362BBF6BDE95F64A5203421E920FA380A5&dn=Enemy+at+the+Gates+%282001%29+%5B720p%5D+%5BYTS.AG%5D&tr=udp%3A%2F%2Fglotorrents.pw%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fp4p.arenabg.ch%3A1337&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337"

    const torrentController = await createTorrentController(magnetLink)
    const files = torrentController.getFiles()
    // const stream = torrentController.startDownloadingFile('')
    console.log("FILES:", files) 

    torrentController.startDownloadingFileTo(files[0], os.homedir() + '/movie');

}

main()