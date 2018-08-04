## Patrón de Repositorio
Es un patrón de diseño que consiste en crear intermediarios entre el modelo del dominio y el código del negocio,  denominados 'Repositorios'. Con el uso de repositorios, el código del negocio solo se preocuparía en obtener los datos solicitados, sin enfocarse en la interacción directa con el modelo, o la persistencia de los objetos.

## En el presente sistema

En el presente directorio se encuentran varias carpetas. Cada carpeta tiene:
* Un modelo de repositorio
* Una clase que implementa el susodicho repositorio

El modelo del repositorio (interfaz) contiene las funciones base del repositorio, y la clase implementa esta interfaz, pero con su propia lógica. El modelo de repositorio, al ser interfaz, puede ser implementado por otras clases que implementen distintos ORMs:

    //Interfaz base
    RepositoryInterface.php
    
    //Implementaciones
    EloquentRepository.php //Eloquent ORM
    SymfonyRepository.php //Symfony ORM
    ...
    

En el caso del sistema, se está usando el Eloquent, propio de Laravel, para implementar el repositorio.

-----------

Los controladores, en lugar de usar el modelo directamente, usan la **interfaz** del repositorio, que está asociada con la implementación del mismo. La asociación se logra en `/app/providers/AppServiceProvider.php`.

Esto aparece en la función boot():
```php
   //Extracto del repositorio de usuarios
    $this->app->singleton(UsersRepository::class, EloquentUser::class);
```
Lo que se hace es asociar la interfaz con la implementación de la interfaz, para así inyectar la interfaz directamente en el controlador. La razón por la que se hace esto, es para evitar futuras modificaciones al controlador cuando se cambie de repositorio. Así el controlador usa la interfaz base, y al mismo tiempo es ignorante de que clase de implementación se esté usando. Cuando se quiera cambiar de implementación, solo se altera el singleton.

----------

En `app/Http/Controllers/Api` se encuentran los controladores de cada repositorio. Se inyecta la interfaz del repositorio en el constructor del controlador:

```php
//Se usa UsersRepository en lugar de EloquentUser
 public function __construct(UsersRepository $user){
    		$this->user = $user;
    	}
````

Así, el controlador llama a métodos de la interfaz sin preocuparse por la implementación del mismo.