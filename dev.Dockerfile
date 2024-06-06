# Usa uma imagem base do Node.js
FROM node:16-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de package.json e package-lock.json
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante dos arquivos da aplicação
COPY . .

# Expõe a porta que o aplicativo vai rodar
EXPOSE 5173

# Comando para iniciar a aplicação
CMD ["npm", "run", "dev"]
