#!/usr/bin/env bash

# Pré-requisitos para rodar este comando:
mkdir /opt/apps/centralAplicacoes

# Acessando o diretório criado
cd /opt/apps/centralAplicacoes

# Download da aplicação e Exclusão das versões anteriores
rm -rf /opt/apps/centralAplicacoes/Central-aplicacoes*
wget -O Central-aplicacoes.AppImage https://nexus.farmaciassaojoao.com.br/repository/static-hosted/central-aplicacoes/Central-aplicacoes.AppImage

# Baixando a entrada para o menu
rm -rf /opt/apps/centralAplicacoes/fsj-centralAplicacoes-desktop.desktop
wget https://nexus.farmaciassaojoao.com.br/repository/static-hosted/central-aplicacoes/fsj-centralAplicacoes-desktop.desktop

# Baixando o icone
rm -rf /opt/apps/centralAplicacoes/fsj-centralAplicacoes-desktop.png
wget https://nexus.farmaciassaojoao.com.br/repository/static-hosted/central-aplicacoes/fsj-centralAplicacoes-desktop.png

# Tornando o app image executavel
chmod a+x Central-aplicacoes.AppImage

# Criando a entrada no menu e no Desktop
cp /opt/apps/centralAplicacoes/fsj-centralAplicacoes-desktop.desktop /usr/share/applications
cp /opt/apps/centralAplicacoes/fsj-centralAplicacoes-desktop.desktop /home/fsj/Área\ de\ trabalho/

# Ajuste de permissões
chown fsj:fsj /home/fsj/Área\ de\ trabalho/fsj-centralAplicacoes-desktop.desktop
chmod 755 /home/fsj/Área\ de\ trabalho/fsj-centralAplicacoes-desktop.desktop
chown fsj:fsj -R /opt/apps/centralAplicacoes
