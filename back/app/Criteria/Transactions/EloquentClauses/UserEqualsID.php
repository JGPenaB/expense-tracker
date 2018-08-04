<?php

namespace App\Criteria\Transactions\EloquentClauses;

use App\Criteria\Transactions\TransactionsCriteriaInterface;
use App\Criteria\Transactions\TransactionsCriteria;
use App\Repositories\Transactions\TransactionsRepository;


class UserEqualsID extends TransactionsCriteria
{
	private $condition;
	
	public function __construct($condition){
		$this->condition = $condition;
	}
	public function apply($model, TransactionsRepository $repository){
		$model = $model->where("user_id","=",$this->condition);
		return $model;
	}
	
}