# CORD Angular 4 PHP Slim

Proyecto Generado en [Angular CLI](https://github.com/angular/angular-cli) version 6.0.0 y Slim 3.0.

## Rquerimientos
  - Apache 2.4
  - PHP 7.1
  - MySQL 5.7
  - Angular Cli 6.0
  - Node.js 6.0
  
## Instalación
  - Crear Base de Datos en Mysql `web-testing`, luego importar bd desde `api/bd/web-testing.sql`
  - Editar Archivo de configuración para la base de datos, ir a `api/index.php`
  
     ```
      $dbhost="127.0.0.1";    // IP 
      $dbuser="";             // User DB
      $dbpass="";             // PasswordDB
      $dbname="web-testing";  // DB
      
  - Ir a la carpeta `fron-end/` ejecutar `npm install`
  - En la carpeta `fron-end/` ejecutar `ng serve -o` luego navegar a `http://localhost:4200`

