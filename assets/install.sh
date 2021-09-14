#!/usr/bin/env bash

# Pré-requisitos para rodar este comando:
mkdir /opt/apps
mkdir /opt/apps/centralAplicacoes

# Indo para o diretório correto
cd /opt/apps/centralAplicacoes

# Baixando a app
rm -rf /opt/apps/centralAplicacoes/Central-aplicacoes-2.0.0.AppImage
wget -O Central-aplicacoes-2.0.0.AppImage https://nexus.farmaciassaojoao.com.br/repository/static-hosted/central-aplicacoes/Central-aplicacoes-2.0.0.AppImage

# Baixando a entrada para o menu
rm -rf /opt/apps/centralAplicacoes/fsj-centralAplicacoes-desktop.desktop
wget https://nexus.farmaciassaojoao.com.br/repository/static-hosted/central-aplicacoes/fsj-centralAplicacoes-desktop.desktop

# Baixando o icone
rm -rf /opt/apps/centralAplicacoes/fsj-centralAplicacoes-desktop.png
wget https://nexus.farmaciassaojoao.com.br/repository/static-hosted/central-aplicacoes/fsj-centralAplicacoes-desktop.png

# Tornando o app image executavel
chmod a+x Central-aplicacoes-2.0.0.AppImage

# Criando a entrada no menu
cp /opt/apps/centralAplicacoes/fsj-centralAplicacoes-desktop.desktop /usr/share/applications
