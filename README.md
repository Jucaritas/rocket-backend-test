<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
  </p>

  # NestJS Backend con TypeORM y MariaDB

  Aplicación backend construida utilizando el framework NestJS, TypeORM con base de datos MariaDB.

  ## Requisitos

  - Node.js v22.x o mayor
  - Base de datos MariaDB
  - CLI de NestJS previamente instalado con el comando `npm install -g @nestjs/cli`

  ## Servidor de Desarrollo

  1. Instalar las dependencias usando npm o yarn:

    ```bash
    npm install
    # o
    yarn
    ```

  2. Crear una copia del archivo `.env.template` y renombrarlo como `.env`. Se deben actualizar las credenciales para conectar con la base de datos en el archivo `.env`, así como el secreto y tiempo de vida del token `JWT` generado:

    ```
     # DATABASE CONFIGURATION
     # comentar localhost y descomentar db para docker
     DB_HOST=localhost
     # DB_HOST=db
     DB_PORT=3306
     DB_USERNAME=root
     DB_PASSWORD=toor
     DB_DATABASE=rocket

     # JWT CONFIGURATION
     JWT_SECRET=@@SecretD3v3l0pm3n7@_2025
     JWT_EXPIRES_IN=1h
    ```

  3. Iniciar el servidor de desarrollo con los siguientes comandos:

    ```bash
    npm run start:dev
    # o
    yarn start:dev
    ```

  4. Para comenzar a registrar información, se puede acceder a la documentación Swagger en la ruta:

    ```bash
    http://localhost:3000/api/docs
    ```

  ## Despliegue en Producción (Docker)

  Para ejecutar la aplicación en `Docker`, en el archivo `.env`, cambiar el `DB_HOST` de `localhost` a `db`, para tomar el host del contenedor.

  1. Construir la imagen Docker:

    ```bash
    docker compose build
    ```

  2. Iniciar el contenedor `Docker`:

    ```bash
    docker compose up -d
    ```

  3. Eliminar recursos no usados en `Docker`:

    ```bash
    docker system prune -f
    ```

    (En Windows se deben ejecutar los comandos por separado).

  La aplicación debería ejecutarse en un entorno de producción.
