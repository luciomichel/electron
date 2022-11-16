<div align="center">
  <h1>fsj-link-projects-deskto</h1>
  <p>Container desktop, criado para não usar os navegadores das filiais.</p>
  <p>A aplicação faz um apontamento para o servidor, onde está hospedado a aplicação; desta forma não fazendo-se necessário atualização do Electron como um todo sempre que precisa um pequeno ajuste.</p>
</div>

## Instalação 
Para istalar os pacot do projeto execute npm install

## Configuração
Preciso configurar o token do repositorio no electron-builder.yml 
No package.json apontar a url do repositório de onde irá buscar a atualização e modificar tipo, sendo "GIT", "BITBucket" e etc.. 

## Atualização automática
a atualização automatica ocorre de acordo com a mudança de versão do repositorio, não necessitando de arquivos de apoio, facilitando a atualização e 
o efeito do codigo