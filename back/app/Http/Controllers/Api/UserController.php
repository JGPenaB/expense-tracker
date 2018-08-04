<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\User_Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use McCool\LaravelAutoPresenter\Facades\AutoPresenter;

//Usamos la interfaz directamente en lugar de una clase que implemente esta interfaz.
use App\Repositories\User\UsersRepository;

class UserController extends Controller
{
    private $user;
	
	/*
	Como se hizo una unión entre la interfaz y la clase que lo implementa (Eloquent<nombre>.php), se puede inyectar
	la interfaz directamente en el constructor.
	
	Dentro de la lógica de las funciones, llamamos a las funciones de la interfaz directamente:
	
	$this->user->/nombre de la funcion en la interfaz/
	$this->user->all();
	
	Así el controlador es ignorante de lo que ocurre con la persistencia de los datos.
	*/
	
	public function __construct(UsersRepository $user){
		$this->user = $user;
	}
	
	public function RegistrarUsuario(User_Request $request){
		$this->user->store($request->all());
		return response()->json(['usuario_creado'], 201);
	}
	
	public function ActualizarUsuario($id, User_Request $request){
		$this->user->update($id, $request->all());
		return response()->json(['usuario_actualizado'], 201);
	}
	
	public function EliminarUsuario($id){
		return $this->user->delete($id);
		return response()->json(['usuario_eliminado'], 201);
	}
	
	public function ObtenerUsuario($id){
		$usuario = $this->user->getById($id);
		return response()->json(compact('usuario'));
	}
	
	public function ObtenerListaUsuarios(){
		$usuarios = $this->user->all();
		return response()->json(compact('usuarios'));
	}
}
