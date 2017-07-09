import * as path from "path"

import { app, BrowserWindow } from "electron"



let mainWindow: Electron.BrowserWindow | null = null

export function initUI () {
    app.on("ready", () => {
        mainWindow = new BrowserWindow()
        mainWindow.show()
        // HtmlWebpackPlugin puts index.js in the same dir as the main process bundle.
        mainWindow.loadURL(`file://${__dirname}/index.html`)
        mainWindow.webContents.openDevTools()
    })
}
