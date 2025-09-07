import { app, BrowserWindow, protocol } from 'electron'
import { join } from 'node:path'
import { normalize } from 'node:path'

const isDev = !!process.env.VITE_DEV_SERVER_URL

async function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
    show: false,
  })

  win.once('ready-to-show', () => win.show())

  if (isDev && process.env.VITE_DEV_SERVER_URL) {
    await win.loadURL(process.env.VITE_DEV_SERVER_URL)
    win.webContents.openDevTools({ mode: 'detach' })
  } else {
    await win.loadURL('app://index.html')
  }
}

// Register a secure custom protocol to serve built files in production
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { standard: true, secure: true, supportFetchAPI: true } },
])

app.whenReady().then(() => {
  if (!isDev) {
    const baseDir = join(process.resourcesPath, 'dist/renderer')
    protocol.registerFileProtocol('app', (request, callback) => {
      try {
        const url = new URL(request.url)
        let pathname = url.pathname
        if (!pathname || pathname === '/') pathname = '/index.html'
        // Prevent path traversal and map to resources/dist/renderer
        const resolved = normalize(join(baseDir, decodeURIComponent(pathname).replace(/^\//, '')))
        if (!resolved.startsWith(normalize(baseDir))) {
          return callback({ error: -6 }) // net::ERR_FILE_NOT_FOUND
        }
        return callback(resolved)
      } catch {
        return callback({ error: -324 }) // net::ERR_INVALID_URL
      }
    })
  }

  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
