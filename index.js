// this is main process


const {app, BrowserWindow } = require('electron');

const path = require('path');
const url = require('url');

const {ipcMain} = require('electron');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 768, height: 1024})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  mainWindow.webContents.on('did-finish-load', () => {
    //pcscReaderInit(mainWindow.webContents);
    console.log('main window web contents load ended')
  });

  // Open the DevTools.
  // Launch full screen with DevTools open, usage: npm run debug
  mainWindow.webContents.openDevTools();
  mainWindow.maximize();

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
});


ipcMain.on('asynchronous-message', (event, message) => {
  console.log('main process: ' + message);
  event.sender.send('asynchronous-message', 'pong');
});