import electron from 'electron'
import { BrowserWindow } from 'electron'
import path from 'path'
import * as remoteMain from '@electron/remote/main'
remoteMain.initialize()

export default class Main {
    static mainWindow: Electron.BrowserWindow
    static application: Electron.App
    static BrowserWindow
    private static onWindowAllClosed() {
        if (process.platform !== 'darwin') {
            Main.application.quit()
        }
    }

    private static onClose() {
        // Dereference the window object. 
        Main.mainWindow = null
    }

    private static onReady() {
        var screenElectron = electron.screen
        var mainScreen = screenElectron.getPrimaryDisplay() /*screenElectron.getAllDisplays()[1]*/
        var dimensions = mainScreen.size

        Main.mainWindow = new Main.BrowserWindow(
            {
                
                width: dimensions.width,
                height: dimensions.height,
                webPreferences: {
                    plugins: true,
                    nodeIntegration: true,
                    contextIsolation: false,
                    backgroundThrottling: false,
                    nativeWindowOpen: false,
                    webSecurity: false,
                    preload: path.join(__dirname, 'preload.js')
                }
            })

        Main.mainWindow
            .loadURL('file://' + __dirname + '/src/public/index.html')
        Main.mainWindow.setBounds(mainScreen.workArea)
        Main.mainWindow.setFullScreen(true)
        Main.mainWindow.setMenu(null)
        Main.mainWindow.webContents.openDevTools()
        remoteMain.enable(Main.mainWindow.webContents)
        Main.mainWindow.on('closed', Main.onClose)
        
    }

    static main(app: Electron.App, browserWindow: typeof BrowserWindow) {
        // we pass the Electron.App object and the  
        // Electron.BrowserWindow into this function 
        // so this class has no dependencies. This 
        // makes the code easier to write tests for 
        Main.BrowserWindow = browserWindow
        Main.application = app
        Main.application.on('window-all-closed', Main.onWindowAllClosed)
        Main.application.on('ready', Main.onReady)
    }
}