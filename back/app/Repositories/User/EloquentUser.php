<?php

namespace App\Repositories\User;

use App\Models\User; //Carga el modelo User
use App\Repositories\User\UsersRepository;
use McCool\LaravelAutoPresenter\Facades\AutoPresenter;

Class EloquentUser implements UsersRepository
{
	private $model;
	
	public function __construct(User $model){
		$this->model = $model;
	}
	
    public function all(){
		return $this->model->all();
	}
	
	public function getById($id){
		return $this->model->find($id);
	}
	
	public function store(array $attributes){
		return $this->model->create($attributes);
	}
	
	public function update($id, array $attributes){
		return $this->model->find($id)->update($attributes);
	}
	
	public function delete($id){
		return $this->model->find($id)->delete();
	}
	
}
