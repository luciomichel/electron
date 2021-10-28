const path = require('path');
const electron = require('electron');
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

function createWindow() {
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
