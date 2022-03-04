const path = require('path');
const electron = require('electron');
const { shell } = require('electron');
const { Notification } = require('electron');
require('dotenv').config();

require('./electron-updater');

const { app, BrowserWindow, nativeImage, globalShortcut } = electron;
let mainWindow;

const beEaster = ['N', 'N', 'N'];

const getTitle = (subTitle) => {
  const versao = require('./../package.json').version;
  const windowTitle = `Central de Aplicações - ${versao} - ${subTitle}`;
  return windowTitle;
};

function showNotification({ title, body }) {
  const notification = {
    title: title,
    body: body,
  };
  new Notification(notification).show();
}

function createWindow() {
  const versao = require('./../package.json').version;
  showNotification({
    title: 'Central de Aplicações',
    body: `Versão: ${versao}`,
  });
  globalShortcut.register('Shift+Control+D', () => {
    beEaster.push('D');
    beEaster.shift();
  });
  globalShortcut.register('Shift+Control+E', () => {
    beEaster.push('E');
    beEaster.shift();
  });
  globalShortcut.register('Shift+Control+V', () => {
    beEaster.push('V');
    beEaster.shift();
    if (beEaster.join('') === 'DEV') {
      console.log('Indeed you are a DEVELOPER!!');
      mainWindow.webContents.openDevTools();
    }
  });

  const iconPath = path.resolve(
    app.getAppPath(),
    'assets',
    'icons',
    'icon.png'
  );
  const icon = nativeImage.createFromPath(iconPath);

  // Cria a janela que será renderizada a aplicação
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
    icon,
  });

  if (process.env.SHOW_DEV_TOOLS === 'true') {
    // abre dev tools
    mainWindow.webContents.openDevTools();
  }

  // Maximiza a janela e remove os botões do menu
  mainWindow.maximize();
  mainWindow.removeMenu();

  // Inicia o Electron no arquivo HTML que irá redirecionar para o projeto
  const filePath = path.resolve(app.getAppPath(), 'src', 'index.html');
  mainWindow.loadFile(filePath);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.on('page-title-updated', (e, title, eSet) => {
    e.preventDefault();
    mainWindow.setTitle(getTitle(title));
  });
  mainWindow.webContents.session.on(
    'will-download',
    (event, item, webContents) => {
      var fs = require('fs');
      var filePath;

      if (process.platform === 'linux') {
        filePath = app.getPath('home') + '/fsj-app/';
      } else {
        filePath = app.getPath('home') + '\\fsj-app\\';
      }
      // Set the save path, making Electron not to prompt a save dialog.
      // delete directory recursively
      try {
        fs.rmdirSync(filePath, { recursive: true });
        console.log(`${filePath} is deleted!`);
      } catch (err) {
        console.error(`Error while deleting ${filePath}.`);
      }

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath);
      }

      const fileNameAndPath = filePath + item.getFilename();
      item.setSavePath(fileNameAndPath);
      item.on('updated', (event, state) => {
        if (state === 'interrupted') {
          console.log('Download is interrupted but can be resumed');
        } else if (state === 'progressing') {
          if (item.isPaused()) {
            console.log('Download is paused');
          } else {
            console.log(`Received bytes: ${item.getReceivedBytes()}`);
          }
        }
      });
      item.once('done', (event, state) => {
        if (state === 'completed') {
          console.log('Download successfully');
          console.log(fileNameAndPath);
          shell.openExternal('file:' + fileNameAndPath);
        } else {
          console.log(`Download failed: ${state}`);
        }
      });
    }
  );
}

app.on('ready', createWindow);
app.allowRendererProcessReuse = true;

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
app.on('replace-window', (path) => mainWindow.loadFile(path));
