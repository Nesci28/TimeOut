const { app, BrowserWindow, ipcMain, screen } = require("electron");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
let overlays;

ipcMain.on("openOverlays", () => {
  overlays = openOverlays();
  overlays.forEach((o) => o.loadURL("http://localhost:4200/overlay"));
});
ipcMain.on("closeOverlays", () => {
  console.log("i am here");
  closeOverlays();
});
ipcMain.on("postponeOverlays", (minute) => {
  console.log("minute :>> ", minute);
  closeOverlays();
  setTimeout(() => {
    openOverlays();
  }, minute * 1000);
});

function openOverlays() {
  const monitors = screen.getAllDisplays();

  const newWindows = [];
  monitors.forEach((m) => {
    const { x, y } = m.bounds;
    const newWindow = new BrowserWindow({
      show: true,
      x: x + 50, // Arbitrary offsets to ensure it's on the right display/monitor
      y: y + 50,
      width: 600,
      height: 300,
      frame: false,
      transparent: true,
      alwaysOnTop: true,
      visibleOnAllWorkspaces: true,
      hasShadow: false,
      webPreferences: { nodeIntegration: true },
      backgroundColor: "#000",
    });
    newWindow.loadURL("http://localhost:4200/overlay");

    newWindow.once("ready-to-show", () => {
      newWindow.show();
    });

    if (process.platform === "darwin") {
      newWindow.maximize();
    }
    newWindows.push(newWindow);
  });

  return newWindows;
}
function closeOverlays() {
  console.log("overlays :>> ", overlays);
  overlays.forEach((o) => o.close());
}

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app.
  win.loadURL("http://localhost:4200");

  // Open the DevTools.
  win.webContents.openDevTools();

  // Emitted when the window is closed.
  win.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
