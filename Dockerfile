# Etapa 1: Build da aplicação
FROM node:18 AS build

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o package.json, yarn.lock e instala as dependências
COPY package.json yarn.lock ./

RUN yarn install

# Copia o código do aplicativo para o diretório de trabalho
COPY . .

# Compila o app para produção
RUN yarn build

# Etapa 2: Configuração para servir a aplicação com `serve`
FROM node:18-alpine

# Instala o `serve` globalmente para servir o app estático
RUN yarn global add serve

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos do build para a nova imagem
COPY --from=build /app/build /app

# Expõe a porta 3000 para o serviço
EXPOSE 3000

# Inicia o `serve` para servir a aplicação na porta 3000
CMD ["serve", "-s", ".", "-l", "3000"]
