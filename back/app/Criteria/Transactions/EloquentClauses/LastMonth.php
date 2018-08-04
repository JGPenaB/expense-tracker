<?php

namespace App\Criteria\Transactions\EloquentClauses;

use Carbon\Carbon;
use App\Criteria\Transactions\TransactionsCriteriaInterface;
use App\Criteria\Transactions\TransactionsCriteria;
use App\Repositories\Transactions\TransactionsRepository;

class LastMonth extends TransactionsCriteria
{
	private $condition;
	
	public function __construct($condition){
		$this->condition = $condition;
	}
	public function apply($model, TransactionsRepository $repository){
		$model = $model->where("date",">=",$this->condition->subDays(30));
		return $model;
	}
	
}