#!/bin/sh
echo diretorio de trabalho $WORKDIR
INST_DIR=/u/super-avanco
cd $WORKDIR
cd dist
echo removendo bibliotecas antigas
rm -rf $INST_DIR/server/node_modules
cp -rf * $INST_DIR
