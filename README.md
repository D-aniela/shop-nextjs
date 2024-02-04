# Descripción


## Correr en dev

1. Clonar el repositorio
2. Crear una copia del ```.env.template``` y renombrarlo a ```.env``` y cambiar las variables de entorno.
3. Instalar dependencias con `npm install` o `yarn`.
4. Levantar la bade de datos `docker compose -f docker-compose.yml up -d`
5. Correr las migraciones de Prisma ```yarn migrate-dev```
6. Ejecutar seed `yarn seed`
7. Ejecutar la aplicación con `npm run dev` o `yarn dev`.

- La aplicación se ejecutará en [http://localhost:3000]
