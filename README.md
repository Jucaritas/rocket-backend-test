# NestJS Backend con TypeORM y MariaDB

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Descripción General

Aplicación backend construida utilizando el framework NestJS, TypeORM con base de datos MariaDB, diseñada para la gestión de artículos con autenticación JWT.

## Tecnologías y Decisiones de Arquitectura

### Stack Tecnológico
- **Backend**: NestJS (Framework de Node.js)
- **ORM**: TypeORM
- **Base de Datos**: MariaDB
- **Autenticación**: JWT (JSON Web Tokens)
- **Contenerización**: Docker
- **Documentación de API**: Swagger

#### Framework - NestJS
- **Razones de elección**:
  - Arquitectura modular y escalable basada en módulos, controladores y servicios
  - Soporte nativo para TypeScript
  - Integración sencilla con diferentes bases de datos y librerías
  - Excelente rendimiento y tipado fuerte

#### ORM - TypeORM  
- **Motivaciones**:
  - Soporte nativo para TypeScript
  - Mapeo de entidades simple y declarativo
  - Generación automática de migraciones
  - Abstracción de la lógica de acceso a datos
  - Facilita la definición de relaciones entre entidades

#### Autenticación - JWT
- **Implementación**:
  - Protección de rutas mediante tokens
  - Generación de tokens con información de usuario
  - Estrategia de autenticación basada en Guards de NestJS
  - Tiempo de expiración configurable
  - Validación y gestión segura de credenciales

#### Contenerización - Docker  
- **Beneficios**:
  - Entorno de desarrollo consistente
  - Facilidad de despliegue
  - Aislamiento de servicios
  - Configuración mediante docker-compose
  - Portabilidad entre diferentes entornos

## Requisitos Previos

- Node.js v22.x o mayor
- Base de datos MariaDB
- Docker (opcional, para despliegue)
- CLI de NestJS (`npm install -g @nestjs/cli`)

## Configuración y Desarrollo Local

1. Clonar el repositorio
```bash
git clone https://github.com/Jucaritas/rocket-backend-test.git
cd rocket-backend-test
```

2. Instalar dependencias
```bash
npm install
# o
yarn
```

3. Configurar variables de entorno
- Copiar `.env.template` a `.env`
- Actualizar configuraciones de base de datos y JWT

4. Iniciar servidor de desarrollo
```bash
npm run start:dev
# o
yarn start:dev
```

5. Acceder a documentación Swagger
```
http://localhost:3000/api/docs
```

## Despliegue con Docker

1. Ajustar `DB_HOST` en `.env` a `db`

2. Construir imagen Docker
```bash
docker compose build
```

3. Iniciar contenedores
```bash
docker compose up -d
```

## Endpoints Principales

- `POST /auth/login`: Autenticación
- `POST /auth/register`: Autenticación
- `GET /articles`: Listar artículos
- `GET /articles/:id`: Obtener artículo por id
- `POST /articles`: Crear artículo
- `PUT /articles/:id`: Actualizar artículo
- `DELETE /articles/:id`: Eliminar artículo

## Consideraciones de Seguridad
- Tokens JWT con tiempo de expiración configurable
- Protección contra inyección SQL mediante TypeORM
- Validación de datos de entrada
- Guards e interceptores para control de acceso
- Documentación de API securizada

## Configuración de Entorno

### Variables de Entorno
```
# Configuración de Base de Datos
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=toor
DB_DATABASE=rocket

# Configuración JWT
JWT_SECRET=@@SecretD3v3l0pm3n7@_2025
JWT_EXPIRES_IN=1h
```

## Mejoras Futuras
- Implementar refresh tokens
- Configurar CI/CD
- Mejorar validación de datos
- Implementar logging avanzado

## Comandos Útiles

### Desarrollo
```bash
# Modo desarrollo
npm run start:dev

# Construcción
npm run build

# Pruebas
npm run test
```

### Docker
```bash
# Construir imagen
docker compose build

# Iniciar contenedores
docker compose up -d

# Eliminar recursos no utilizados
docker system prune -f
```
