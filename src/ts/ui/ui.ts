import * as path from "path"

import { app, BrowserWindow } from "electron"

namespace ui {

    let mainWindow: Electron.BrowserWindow | null = null

    export function init () {
        app.on("ready", () => {
            mainWindow = new BrowserWindow()
            mainWindow.show()
            const indexPageUrl = path.join(__dirname, "../../html", "home.html")
            mainWindow.loadURL(`file://${indexPageUrl}`)
        })
    }

}

export default ui;