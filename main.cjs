const { app, BrowserWindow } = require("electron");
const path = require("path");


const isDev = !!process.env.ELECTRON_START_URL;

const startURL = process.env.ELECTRON_START_URL || "https://tu-proyecto.vercel.app/";

function createWindow() {
  const win = new BrowserWindow({
    width: 375, // Ancho de móvil 
    height: 667, // Alto de móvil 
    resizable: true, 
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  if (isDev) {
    win.loadURL(startURL);
    // Abre las herramientas de desarrollador solo en modo dev
    win.webContents.openDevTools();
  } else {
    // En producción carga la URL de Vercel o el archivo local
    win.loadURL(startURL);
  }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});