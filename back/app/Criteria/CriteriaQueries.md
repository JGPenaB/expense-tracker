## Criteria Queries
Los criteria queries responden al patrón 'Specification', que surge ante el problema de crear, combinar y simplificar diferentes reglas del negocio para filtrar información. Con los criteria queries se pueden añadir condiciones (filtrado) desde el repositorio para obtener datos específicos.

## En el presente sistema
El presente directorio contiene carpetas para cada repositorio. En cada carpeta hay:

 - Una interfaz de criteria
 - Una clase abstracta de criteria
 - Una carpeta con archivos que representan distintas condiciones

La interfaz de criteria es una interfaz que el repositorio tiene que implementar, mientras que la clase abstracta se usa para crear clases hijo, que representan condiciones a cumplir. Aquí un ejemplo de como está distribuido:

```Javascript
//Ejemplo de usuarios
UserCriteriaInterface.php
UserCriteria.php // <-- Clase abstracta
	/EloquentClauses/
	-----	UserEqualsID.php  //Condicion para buscar por ID
	-----	UserOlderThan.php //Condicion para buscar por fecha
	...
```
En este ejemplo, dentro de la carpeta '*EloquentClauses*', van los queries que extienden la clase *UserCriteria*. La clase *UserCriteria* necesita una instancia de la clase *UserRepository* para inyectar los filtros. Pero como se realizó una asociación entre la interfaz del repositorio y una clase, lo que se está diciendo aquí es que *UserCriteria* necesita una instancia de la clase *EloquentUser*.

----------

Para que funcione, se tiene que modificar la clase que está asociada a la interfaz del repositorio, para que implemente el *CriteriaInterface* y permita la inyección de filtros. El controlador modificado de la clase quedaría así:

```php
	private $model;
	private $criteria;
	
	public function __construct(User $model, Collection $criteria){
		$this->model = $model;
		$this->criteria = $criteria;
	}
```
Ya con el *criteria* implementado, se modifica los métodos de la clase para incluir los filtros. En este caso, en lugar de:

```php
	public function all($id_user){
		return $this->model->all();
	}
```
Se modifica para incluir los filtros:
```php
	public function all($id_user){
		$this->applyCriteria();
		return $this->model->get();
	}
```
Y por último, en el controlador, se incluyen las clases creadas que extienden *UserCriteria*, y se aplica el filtro mediante un método de *EloquentUser*.

```php
	public function ObtenerUsuario($id_user){
		$this->category->pushCriteria(new UserEqualsID($id_user));
		$user = $this->category->all($id_user);
		return response()->json(compact('user'));
	}
```

El pushCriteria, en el caso de Eloquent, añade una cláusula *where()*, que desde el punto de vista del Eloquent QueryBuilder, quedaría así.

```php
	$this->model->where()->get;
```

Si se añaden más condiciones:

```php
$this->category->pushCriteria(new UserEqualsID($id_user));
$this->category->pushCriteria(new UserOlderThan(Carbon::today()));
```

Quedaría así:

```php
	$this->model->where()->where()->get;
```