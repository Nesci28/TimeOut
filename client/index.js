const { app, BrowserWindow, ipcMain, screen, Tray, Menu } = require("electron");
const { menubar } = require("menubar");
const path = require("path");
const moment = require("moment");

let win;
let overlays;

ipcMain.on("openOverlays", (_, arg) => {
  const { ms } = arg;
  overlays = openOverlays(ms);
});
ipcMain.on("closeOverlays", () => {
  closeOverlays();
});
ipcMain.on("postponeOverlays", (_, arg) => {
  const { minute } = arg;
  closeOverlays();
  setTimeout(() => {
    overlays = openOverlays(minute);
  }, minute * 60 * 1000);
});

function openOverlays(ms) {
  const monitors = screen.getAllDisplays();

  const newWindows = [];
  monitors.forEach((m) => {
    const { x, y } = m.bounds;
    const { width, height } = m.size;

    const newWindow = new BrowserWindow({
      show: true,
      x,
      y,
      width,
      height,
      frame: process.env.NODE_ENV === "production" ? false : true,
      alwaysOnTop: true,
      visibleOnAllWorkspaces: true,
      hasShadow: false,
      webPreferences: { nodeIntegration: true },
      transparent: true,
      vibrancy: "dark",
      visualEffectState: "active",
    });
    newWindow.loadURL(`http://localhost:4200/overlay?ms=${ms}`);

    if (process.env.NODE_ENV !== 'production') {
      newWindow.webContents.openDevTools();
    }

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
  overlays.forEach((o) => {
    try {
      return o.close();
    } catch (_) {}
  });
}

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadURL("http://localhost:4200");

  win.webContents.openDevTools();

  win.once("ready-to-show", () => {
    win.show();
  });

  win.on("closed", () => {
    win = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});

const trays = {
  normal: {
    icon: path.join(__dirname, "src", "assets", "icons", "normal.png"),
    tooltip: "Normal break",
    tray: undefined,
  },
  micro: {
    icon: path.join(__dirname, "src", "assets", "icons", "micro.png"),
    tooltip: "Micro break",
    tray: undefined,
  },
};

app.whenReady().then(() => {
  Object.keys(trays).forEach((k) => {
    trays[k].tray = new Tray(trays[k].icon);
    trays[k].tray.setToolTip(trays[k].tooltip);
  });
});

ipcMain.on("setTraysText", (_, arg) => {
  const { timerType, remaining } = arg;

  trays[timerType].tray.setTitle(convertToTime(remaining));
});

function convertToTime(ms) {
  const tempTime = moment.duration(ms);
  return `${tempTime.hours()}:${tempTime.minutes()}`;
}
