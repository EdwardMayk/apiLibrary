# Usa una imagen base de Node.js
FROM node:18

# Crea un directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia los archivos package.json y package-lock.json (o yarn.lock) al contenedor
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el archivo tsconfig.json y el código fuente TypeScript al contenedor
COPY tsconfig.json ./
COPY src ./src

# Compila el código TypeScript
RUN npm run build

# Copia el código JavaScript compilado al directorio de trabajo
COPY dist ./dist

# Expone el puerto en el que la aplicación escuchará
EXPOSE 3000

# Define el comando para ejecutar la aplicación
CMD ["node", "dist/server.js"]