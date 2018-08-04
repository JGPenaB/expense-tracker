## Expense Tracker

Es un sistema gestor de transacciones, que le permite al usuario llevar el control de transacciones y categorías creadas.

Para entender mejor el sistema, las carpetas incluyen algunos archivos .md, que contienen una explicación general del funcionamiento de archivos y patrones:

[El patrón de Repositorio.](back/app/Repositories/RepositoryPattern.md)


[Criteria Queries.](back/app/Criteria/CriteriaQueries.md)


## Requisitos
* [PHP](http://www.php.net/) >= 7.1.9
* [Composer](https://getcomposer.org/) >= 1.5.2
* [Angular CLI](https://cli.angular.io/) >= 1.6.0
* [PostgreSQL](https://www.postgresql.org/) >= 9.3
* Base de datos con el nombre de *Expense_Tracker*.

## Instalación
El proyecto está dividido es dos carpetas: **front**, para el *front-end*, y **back**, para el *back-end*. Los pasos a seguir serán divididos para las dos carpetas, pero se recomienda seguir el orden establecido. Los presentes pasos solo aplican en Windows:

### Back:

 1. Abrir una terminal en la carpeta **back**.
 2. Ejecutar el siguiente comando para instalar los paquetes necesarios:  `composer install`
 3. Ejecutar el siguiente comando para iniciar las migraciones: `php artisan migrate`
 4. Ejecutar el siguiente comando para iniciar el servidor: `php artisan serve`

### Front:

 1. Abrir una terminal en la carpeta **front**.
 2. Ejecutar el siguiente comando para instalar los paquetes necesarios: `npm install`
 3. Ejecutar el siguiente comando para iniciar el servidor: `ng serve --open`

Una vez hecho esto, el navegador predeterminado del sistema abrirá el sitio.

## Frameworks y herramientas usadas:
### Laravel 5.6
* [jwt-auth](https://github.com/tymondesigns/jwt-auth)
* [laravel-cors](https://github.com/barryvdh/laravel-cors)

### Angular 5.2
* [ng2-materialize](https://github.com/sherweb/ngx-materialize)
* [ng2-charts-x](https://github.com/GeoThings/ng2-charts-x)
* [angular2-jwt](https://github.com/auth0/angular2-jwt)