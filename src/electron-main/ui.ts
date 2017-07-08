import * as path from "path"

import { app, BrowserWindow } from "electron"

namespace ui {

    let mainWindow: Electron.BrowserWindow | null = null

    export function init () {
        app.on("ready", () => {
            mainWindow = new BrowserWindow()
            mainWindow.show()
            mainWindow.loadURL(`file://${__dirname}/index.html`)
        })
    }

}

export default ui;