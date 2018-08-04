<?php

namespace App\Repositories\Transactions;

use Illuminate\Support\Facades\Hash;
use App\Models\Transactions;
use App\Repositories\Transactions\TransactionsRepository;
use App\Criteria\Transactions\TransactionsCriteriaInterface;
use App\Criteria\Transactions\TransactionsCriteria;
use McCool\LaravelAutoPresenter\Facades\AutoPresenter;

use Illuminate\Support\Collection;

Class EloquentTransactions implements TransactionsRepository, TransactionsCriteriaInterface
{
	private $model;
	private $criteria;
	
	public function __construct(Transactions $model, Collection $criteria){
		$this->model = $model;
		$this->criteria = $criteria;
	}
	
    public function all(){
		$this->applyCriteria();
		return $this->model->get();
	}
	
	public function getById($id){
		$this->applyCriteria();
		return $this->model->find($id);
	}
	
	public function store($user_id, $category_id, array $attributes){
		$attributes["user_id"]=$user_id;
		$attributes["category_id"]=$category_id;
		return $this->model->create($attributes);
	}
	
	public function update($id, array $attributes){
		return $this->model->find($id)->update($attributes);
	}
	
	public function delete($id){
		return $this->model->find($id)->delete();
	}
	
	// Criterias
	public function getCriteria(){
		return $this->criteria;
	}
	
	public function getByCriteria(TransactionsCriteria $criteria){
		$this->model = $criteria->apply($this->model, $this);
		return $this;
	}
	
	public function pushCriteria(TransactionsCriteria $criteria){
		$this->criteria->push($criteria);
		return $this;
	}
	
	public function applyCriteria(){
		foreach ($this->getCriteria() as $criteria){
			if($criteria instanceof TransactionsCriteria)
				$this->model = $criteria->apply($this->model, $this);
		}
		return $this;
	}
}