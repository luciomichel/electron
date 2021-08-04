<div align="center">
  <h1>fsj-link-projects-desktop</h1>
  <p>Container desktop, criado para não usar os navegadores das filiais.</p>
  <p>A aplicação faz um apontamento para o servidor, onde está hospedado a aplicação; desta forma não fazendo-se necessário atualização do Electron como um todo sempre que precisa um pequeno ajuste.</p>
</div>

## Build

Para realizar o build do projeto basta executar o comando `yarn build`. Caso esteja no Linux, é necessário ter instalado o [Wine](https://www.winehq.org/).
Por fim, caso alterado a URL do projeto, deve ser alterado a URL de redirecionamento do arquivo `index.html`.
O ícone da aplicação, para o linux deve ser personalizado, pois o AppImage não gera automaticamente. Detalhes do executável [neste link](https://developer.gnome.org/integration-guide/stable/desktop-files.html.en).
O link executável (centra-aplicacao.desktop) está dentro da pasta assets.
