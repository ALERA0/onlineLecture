FROM node:20

# Uygulama dosyalarınızı koyacağınız dizini belirleyin
WORKDIR /usr/src/app

# Bağımlılıkları kopyalayın ve yükleyin
COPY package*.json ./
RUN npm install

# Uygulama dosyalarını kopyalayın
COPY . .

# Uygulamayı build edin
RUN npm run build

# Uygulamanızın çalışacağı portu belirtin
EXPOSE 3000

# Uygulamayı çalıştırın
CMD ["npm", "run", "start"] 