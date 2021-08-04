#!/usr/bin/env bash

# Pré-requisitos para rodar este comando:
# mkdir /opt/apps/centralAplicacoes

# Indo para o diretório correto
cd /opt/apps/centralAplicacoes

# Baixando a app
rm -rf /opt/apps/centralAplicacoes/centralAplicacoes.AppImage
wget -O centralAplicacoes.AppImage https://nexus.farmaciassaojoao.com.br/repository/static-hosted/central-aplicacoes/Central-aplicacoes-1.0.1.AppImage

# Baixando a entrada para o menu
rm -rf /opt/apps/centralAplicacoes/centralAplicacoes.desktop
wget https://nexus.farmaciassaojoao.com.br/repository/static-hosted/central-aplicacoes/centralAplicacoes.desktop

# Baixando o icone
rm -rf /opt/apps/centralAplicacoes/fsj-centralAplicacoes-desktop.png
wget https://nexus.farmaciassaojoao.com.br/repository/static-hosted/central-aplicacoes/fsj-centralAplicacoes-desktop.png

# Tornando o app image executavel
chmod a+x Central-aplicacoes-1.0.1.AppImage

# Criando a entrada no menu
cp /opt/apps/centralAplicacoes/centralAplicacoes.desktop /usr/share/applications
