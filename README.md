# 📝 Blog project for the Bootcamp JavaScript in Backend and the Bootcamp of React (CodigoFacilito.com)

### Backend ![Version](https://img.shields.io/badge/v0.0.1-alpha_(backend)-blue)

[![NestJS](https://img.shields.io/static/v1?style=for-the-badge&message=NestJS&color=E0234E&logo=NestJS&logoColor=FFFFFF&label=)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)](https://jwt.io/)
[![Passport](https://img.shields.io/static/v1?style=for-the-badge&message=Passport&color=222222&logo=Passport&logoColor=34E27A&label=)](https://www.passportjs.org/)

### Frontend ![Version](https://img.shields.io/badge/v0.0.1-alpha_(frontend)-blue)

[![Vite](https://img.shields.io/static/v1?style=for-the-badge&message=Vite&color=646CFF&logo=Vite&logoColor=FFFFFF&label=)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://www.w3.org/TR/html5/)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)

## Description
This is a merge of two final projects of bootcamps from Codigofacilito.com:
* the backend it's for [Bootcamp de JavaScript en el Backend](https://codigofacilito.com/bootcamps/javascript-backend/);
* the frontend it's for [Bootcamp de React (G3)](https://codigofacilito.com/bootcamps/react-g3/);
* and some CI/CD will be added too.

The project is a Blog site, with posts, categories, users with roles as administrators, moderators and editors, and some other stuff that will be added in near future.

### Backend - Set env constants
Rename the required file and complete the constants:
```
.env.development.sample
.env.production.sample
.env.testing.sample
```

to:
```
.env.development
.env.production
.env.testing
```

The default port is 3001.
Facebook, Google and Twitter keys and secrets are requiered (I will add an enable option in each).


## Backend - Installation
```bash
$ npm install
```

## Backend - Running the app

### Linux/Mac
```bash
# development
$ npm --prefix backend/ run start

# watch mode
$ npm --prefix backend/ run start:dev

# production mode
$ npm --prefix backend/ run start:prod
```

### Windows
```bash
# development
$ npm --prefix backend/ run start

# watch mode
$ npm --prefix backend/ run startw:dev

# production mode
$ npm --prefix backend/ run startw:prod
```


## Backend - Endpoint information
* [Backend - Endpoints](./backend/README.md)
* Swagger: Open http://localhost:3001/docs#/ to view it in the browser.


## Backend - Postman Collections of Endpoints
* [Backend - Postman Collection](https://raw.githubusercontent.com/gsmx64/cf-jsbackend-blog/main/backend/cf-jsbackend-blog(backend).postman_collection.json)


## Frontend - Set env constants
Rename the required file and complete the constants:
```
.env.development.sample
.env.production.sample
.env.testing.sample
```

to:
```
.env.development
.env.production
.env.testing
```

The default port is 3000.


## Frontend - Installation
```bash
$ npm install
```

## Frontend - Running the app

### Linux/Mac
```bash
# development
$ npm --prefix frontend/ run start:dev

# production mode
$ npm --prefix frontend/ run start:prod
```

### Windows
```bash
# development
$ npm --prefix frontend/ run startw:dev

# production mode
$ npm --prefix frontend/ run startw:prod
```


## Browser
Open http://localhost:3000 to view it in the browser.


## Docker
If you have Docker installed on your system, in the root directory, run:

```bash
docker-compose up -d --build
```


## License
This Blog is [GPL-3.0-1 licensed](https://github.com/gsmx64/cf-jsbackend-blog?tab=GPL-3.0-1-ov-file#readme).