<div align="center">
  <h1>fsj-link-projects-deskto</h1>
  <p>Container desktop, criado para não usar os navegadores das filiais.</p>
  <p>A aplicação faz um apontamento para o servidor, onde está hospedado a aplicação; desta forma não fazendo-se necessário atualização do Electron como um todo sempre que precisa um pequeno ajuste.</p>
</div>

## Build

Para realizar o build do projeto basta executar o comando `yarn build`. Caso esteja no Linux, é necessário ter instalado o [Wine](https://www.winehq.org/).
Por fim, caso alterado a URL do projeto, deve ser alterado a URL de redirecionamento do arquivo `index.html`.
O ícone da aplicação, para o linux deve ser personalizado, pois o AppImage não gera automaticamente. Detalhes do executável [neste link](https://developer.gnome.org/integration-guide/stable/desktop-files.html.en).
O link executável (fsj-centralAplicacoes-desktop.desktop) está dentro da pasta assets.

## Instalação

Para realizar a instalação da Central de Aplicações em um PDV, necessário criar a pasta **/opt/apps/central-aplicacoes**, após baixar o arquivo _[install.sh](https://nexus.farmaciassaojoao.com.br/repository/static-hosted/central-aplicacoes/install.sh)_ disponível no nexus interno e então executar o arquivo.

OBS.: A instalação não cria um atalho para a aplicação, o mesmo deve ser feito manualmente.

## Gerando nova versão

> Para compilar em HML é necessário realizar duas alteração no fonte, URL da aplicação principal e URL do Nexus para atualização automática. Arquivos abaixo;
> * electron-updater.js
> * index.html
>
> ### **_Os endereços de HML estão comentados no código_**

Após realizar o build da aplicação, será necessário incrementar a versão no arquivo `updater.json` e atualizar o `sha256` com o novo hash da versão gerada, o comando para gerar esse novo hash é `sha256sum <<CAMINHO_ARQUIVO>>`, em seguinda baste apenas fazer o upload no nexus dos novos arquivos buildados e do `updater.json`.

* PROD:
  * https://nexus.farmaciassaojoao.com.br/repository/static-hosted/central-aplicacoes/updater.json
* HML:
  * https://nexus.farmaciassaojoao.com.br/repository/static-hosted/central-aplicacoes-hml/updater.json

## Atualização automática

Usamos uma dependência (_electron-simple-updater_), que atualiza a aplicação automaticamente.
Apenas precisamos apontar um arquivo json (_updater.json_) que deve ficar hospedado em um servidor sem autenticação de arquivos.
Estamos hospedando o mesmo no [nexus interno - PROD](https://nexus.farmaciassaojoao.com.br/repository/static-hosted/central-aplicacoes/updater.json) / [nexus interno - HML](https://nexus.farmaciassaojoao.com.br/repository/static-hosted/central-aplicacoes-hml/updater.json) .
Sempre que tiver uma atualização disponível, o app irá enviar uma requisição para a [API de gerenciamento](https://gerenciadorversaoapi.srv.farmaciassaojoao.com.br) de versão com os seguintes dados:

```
[POST] -> /gerenciadorversao/consultarVersao
{
  app: 'FSJ_CENTRAL_APLICACOES',
  versaoAtual: app.getVersion(),
  versaoNova: novaVersao,
  so: os.platform(),
  osrelease: os.release(),
  hostname: os.hostname(),
}
```

Esta API controla a data limite de atualização.
Se a API devolver uma data limite de atualização, menor que a data atual, o app irá mostrar a seguinte tela:
![Imagem exemplo Contate o suporte](https://gitlab.farmaciassaojoao.com.br/fsj-tele/fsj-tele-desktop/raw/BT-17711/.md/tele-contate-suporte.png)

Caso contrário, irá seguir no fluxo normal.

Para efetuar uma nova atualização fazer upload de um novo arquivo updater.json incrementando a versão e informando o caminho para a nova versão da imagem.

## Observações de dependências

### electron-simple-updater

Foi necessário um ajuste nesta dependência. Pois quando a aplicação é executada no CentOS 7, é necessário executar ela com um argumento para desabilitar o sandbox do chrome `--no-sandbox`. E quando a aplicação atualizava e ia reiniciar, o parâmetro não era informado, desta forma a aplicação não subia sozinha.
Usado [Esta versão da dependência](https://github.com/AdemilsonMarsiglio/electron-simple-updater.git#linux-appimage-nosandbox) , esta está fixa o parâmetro `--no-sandbox` na inicialização do AppImage no linux.

## Monitoramento

Foi implementado junto ao [Agendamento](http://192.168.0.37:9020/versao) uma consulta para que seja validado a versão em cada PDV de loja. Porém para a mesma funcionar o PDV tem que fazer a chamada da API pelo menos uma vez informando a versão. Para tal, após a instalação da primeira versão, forçar a atualização de uma versão para toda a rede para que os PDVs se registrem.
