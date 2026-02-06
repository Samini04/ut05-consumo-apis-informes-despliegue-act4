const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  hello: () => console.log("Hola desde Electron")
});