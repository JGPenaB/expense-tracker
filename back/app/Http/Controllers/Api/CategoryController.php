<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Http\Requests\Category_Request;
use McCool\LaravelAutoPresenter\Facades\AutoPresenter;

//Criterias
use App\Criteria\Categories\EloquentClauses\UserEqualsID;

use App\Repositories\Categories\CategoriesRepository;

class CategoryController extends Controller
{
	private $category;
	
	public function __construct(CategoriesRepository $category){
		$this->category = $category;
	}
	
	public function RegistrarCategoria($id_user, Category_Request $request){
		$this->category->store($id_user, $request->all());
		return response()->json(['categoria_creada'], 201);
	}
	
	public function EditarCategoria($id, Category_Request $request){
		$this->category->update($id, $request->all());
		return response()->json(['categoria_modificada'], 201);
	}
	
	public function ObtenerListaCategorias($id_user){
		$this->category->pushCriteria(new UserEqualsID($id_user));
		$categorias = $this->category->all($id_user);
		return response()->json(compact('categorias'));
	}
	
	public function ObtenerCategoria($id){
		$categoria = $this->category->getById($id);
		return response()->json(compact('categoria'));
	}
	
	public function EliminarCategoria($id){
		$this->category->delete($id);
		return response()->json(['categoria_eliminada'], 201);
	}
}
