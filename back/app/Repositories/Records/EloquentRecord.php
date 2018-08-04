<?php

namespace App\Repositories\Records;

use App\Models\Record;
use App\Repositories\Records\RecordsRepository;

Class EloquentRecord implements RecordsRepository
{
	private $model;
	
	public function __construct(Record $model){
		$this->model = $model;
	}
	
    public function all($user_id){
		return $this->model->all()->where("user_id","=",$user_id);
	}
	
	public function getById($id){
		return $this->model->find($id);
	}
	
	public function store($user_id, array $attributes){
		$attributes["user_id"]=$user_id;
		return $this->model->create($attributes);
	}
	
	public function update($id, array $attributes){
		return $this->model->find($id)->update($attributes);
	}
	
	public function delete($id){
		return $this->model->find($id)->delete();
	}
	
}
