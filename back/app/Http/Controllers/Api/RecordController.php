<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Record_Request;

use App\Repositories\Records\RecordsRepository;

class RecordController extends Controller
{
    private $record;
	
	public function __construct(RecordsRepository $record){
		$this->record = $record;
	}
	
	public function RegistrarRecord($user_id, Record_Request $request){
		$this->record->store($user_id, $request->all());
		return response()->json(['registro_creado'], 201);
	}
	
	public function ObtenerListaRecord($user_id){
		$records = $this->record->all($user_id);
		return response()->json(compact('records'));
	}
	
	public function ObtenerRecord($id){
		$rec = $this->record->getById($id);
		return response()->json(compact('rec'));
	}
}
