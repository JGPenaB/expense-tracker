<?php

namespace App\Http\Controllers\Api;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Transaction_Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

//Criterias
use App\Criteria\Transactions\EloquentClauses\UserEqualsID;
use App\Criteria\Transactions\EloquentClauses\LastWeek;
use App\Criteria\Transactions\EloquentClauses\LastMonth;
use App\Criteria\Transactions\EloquentClauses\LastYear;

use McCool\LaravelAutoPresenter\Facades\AutoPresenter;

use App\Repositories\Transactions\TransactionsRepository;

class TransactionsController extends Controller
{
    private $transactions;
	
	public function __construct(TransactionsRepository $transactions){
		$this->transactions = $transactions;
	}
	
	public function RegistrarTransaccion($user_id, $category_id, Transaction_Request $request){
		$this->transactions->store($user_id, $category_id, $request->all());
		return response()->json(['transaccion_creada'],201);
	}
	
	/*
		Para usar las condiciones (Criteria), se usa los métodos establecidos por TransactionsRepository, que 
		implementó el TransactionsCriteriaInterface. En este caso el pushCriteria, en el caso de Eloquent,
		"empuja" un where() a la sentencia del QueryBuilder. En ObtenerListaTransacciones, se usa el pushCriteria 
		con la ID del usuario.
	*/
	public function ObtenerListaTransacciones($user_id){
		$this->transactions->pushCriteria(new UserEqualsID($user_id));
		$transacciones = $this->transactions->all();
		return response()->json(compact('transacciones'));
	}
	
	/*
		Aquí es el mismo caso que en ObtenerListaTransacciones, pero se añade otro where() con el pushCriteria
		para manejar las fechas. Lo mismo con las otras dos funciones siguientes. El QueryBuilder quedaría así:
		$this->model->all()->where()->where().
	*/
	//Transacciones desde la semana pasada
	public function ObtenerTransaccionesSemana($user_id){
		$this->transactions->pushCriteria(new UserEqualsID($user_id));
		$this->transactions->pushCriteria(new LastWeek(Carbon::today()));
		$transacciones = $this->transactions->all();
		return response()->json(compact('transacciones'));
	}
	
	//Transacciones desde el mes pasado
	public function ObtenerTransaccionesMes($user_id){
		$this->transactions->pushCriteria(new UserEqualsID($user_id));
		$this->transactions->pushCriteria(new LastMonth(Carbon::today()));
		$transacciones = $this->transactions->all();
		return response()->json(compact('transacciones'));
	}
	
	//Transacciones desde principios de año
	public function ObtenerTransaccionesAño($user_id){
		$this->transactions->pushCriteria(new UserEqualsID($user_id));
		$this->transactions->pushCriteria(new LastYear(Carbon::today()));
		$transacciones = $this->transactions->all();
		return response()->json(compact('transacciones'));
	}
	
	public function ObtenerTransaccion($id){
		$transaccion = $this->transactions->getById($id);
		return response()->json(compact('transaccion'));
	}
	
	public function ActualizarTransaccion($id,Transaction_Request $request){
		$transaccion = $this->transactions->update($id, $request->all());
		return response()->json(['transaccion_actualizada'],201);
	}
	
	public function EliminarTransaccion($id){
		$transaccion = $this->transactions->delete($id);
		return response()->json(['transaccion_eliminada'],201);
	}
}
