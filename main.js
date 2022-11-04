require('update-electron-app')()

const { app, autoUpdater, dialog } = require('electron')

const server = 'https://your-deployment-url.com'
const url = `${server}/update/${process.platform}/${app.getVersion()}`

autoUpdater.setFeedURL({ url })


setInterval(() => {
  autoUpdater.checkForUpdates()
}, 60000)


autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: 'info',
    buttons: ['Reiniciar', 'Mais Tarde'],
    title: 'Atualização Disponivel',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail:
      'Uma nova versão foi Baixada. Reinicie o Aplicativo para Instalar as Atualizações.',
  }

  dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if (returnValue.response === 0) autoUpdater.quitAndInstall()
  })
})

autoUpdater.on('error', (message) => {
  console.error('Ocorreu um erro ao atualizar o aplicativo')
  console.error(message)
})