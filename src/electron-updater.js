/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/*
//const { app, updater, dialog, Notification } = require('electron')
*/

const updater = require("electron-simple-updater");
const { dialog, Notification, app } = require("electron");

const os = require("os");
const path = require("path");

const axios = require("axios");

const init = () => {
  // TODO: Para compilar em HML alterar o endereco abaixo para https://nexus.farmaciassaojoao.com.br/repository/static-hosted/central-aplicacoes-hml/updater.json
  updater.init({
    url: "https://nexus.farmaciassaojoao.com.br/repository/static-hosted/central-aplicacoes/updater.json",
    checkUpdateOnStart: fs.existsSync(path.resolve(path.dirname(process.execPath), '..', 'update.exe')),
  });

  attachUpdaterHandlers();
  console.log("Iniciando app versao:", app.getVersion());
};

function showNotification({ title, body }) {
  const notification = {
    title: title,
    body: body,
  };
  new Notification(notification).show();
}

function attachUpdaterHandlers() {
  updater.on("update-available", onUpdateAvailable);
  updater.on("update-downloading", onUpdateDownloading);
  updater.on("update-downloaded", onUpdateDownloaded);
  updater.on("update-not-available", onUpdateNotAvailable);
  updater.on("error", onUpdaterError);

  function onUpdaterError (message) {
    console.error('Ocorreu um erro ao atualizar o aplicativo')
    console.error(message)
  }

  function onUpdateAvailable(meta) {
    showNotification({
      title: "Atualização!",
      body: "Há uma nova versão disponível! " + meta.version,
    });

    verificarVersaoNoServidor(meta.version);
  }

  function onUpdateDownloading(meta) {
    console.log("Baixando nova versão");
  }

  function onUpdateNotAvailable() {
    console.log("Não é necessário atualizar o app");
  }

  async function onUpdateDownloaded() {
    const options = {
      buttons: ["Sim", "Não"],
      message: "Atualização finalizada, deseja reabrir o programa agora?",
    };

    const response = await dialog.showMessageBox(options);

    if (response.response === 0) {
      console.log("Reiniciando app...");
      updater.quitAndInstall();
    }

    console.log("Opcao selecionada no onUpdateDownloaded", response);
  }
}

async function verificarVersaoNoServidor(novaVersao) {
  const data = {
    sistema: "CENTRALAPLICACOES",
    versaoAtual: app.getVersion(),
    versaoNova: novaVersao,
    so: os.platform(),
    osrelease: os.release(),
    hostname: os.hostname(),
  };

  // console.log("Manda a versão para o servidor", data);
  try {
    console.log(`Body request ${JSON.stringify(data)}`);
    const resp = await axios.post(
      "https://gerenciadorversaoapi.srv.farmaciassaojoao.com.br/gerenciadorversao/consultarVersao",
      data,
      {
        timeout: 5000,
      }
    );
    console.log("Response api -> ", JSON.stringify(resp));
    if (resp.data && resp.data.data && resp.data.data.dtLimiteFmt) {
      const dataLimite = new Date(Date.parse(resp.data.data.dtLimiteFmt));

      if (dataLimite.getTime() < new Date().getTime()) {
        console.log("Bloquear o App");
        bloquearUsoDoApp();
      } else {
        console.log("App liberado para uso, conforme API");
      }
    }
  } catch (e) {
    console.error("Erro ao consultar a versao.", e);
  }
}

function bloquearUsoDoApp() {
  const filePath = path.resolve(
    app.getAppPath(),
    "src",
    "contact-support.html"
  );
  app.emit("replace-window", filePath);
}

init();
