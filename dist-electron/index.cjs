// src/main/index.ts
var import_electron = require("electron");
var import_node_path = require("path");
var import_node_url = require("url");
var isDev = !!process.env.VITE_DEV_SERVER_URL;
async function createWindow() {
  const win = new import_electron.BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: (0, import_node_path.join)(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    },
    show: false
  });
  win.once("ready-to-show", () => win.show());
  if (isDev && process.env.VITE_DEV_SERVER_URL) {
    await win.loadURL(process.env.VITE_DEV_SERVER_URL);
    win.webContents.openDevTools({ mode: "detach" });
  } else {
    const indexHtml = (0, import_node_url.pathToFileURL)((0, import_node_path.join)(process.resourcesPath, "dist/renderer/index.html")).toString();
    await win.loadURL(indexHtml);
  }
}
import_electron.app.whenReady().then(() => {
  createWindow();
  import_electron.app.on("activate", () => {
    if (import_electron.BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
import_electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") import_electron.app.quit();
});
//# sourceMappingURL=index.cjs.map