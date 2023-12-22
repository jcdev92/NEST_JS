<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar
```
npm install
```
3. Tener Nest ClI Instalado
```
npm i g @nestjs/cli
```
4. Levantar base de datos
```
docker-compose up -d
```
5. Clonar el archivo __.env.template__ y renombrar
a __.env__
6. Llenar las variables de entorno definidas en el ```.env``` 
7. Ejecutar la aplicacionm en dev: ```npm run start:dev``` 
8. Reconstruir BD en desarrollo con la semilla
```
GET
http://localhost:3000/api/v2/seed
```

# Production Build
1. Crear el archivo ```.env.prod```
2. Llenar las variables de entorno de prod
3. Crear la nueva imagen
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```


# Notas
Heroku redeploy sin cambios:
```
git commit --allow-empty -m "Tigger Heroku deploy"
git push heroku <master|main>
```

## Stack Usado
* MongoDB
* Nest