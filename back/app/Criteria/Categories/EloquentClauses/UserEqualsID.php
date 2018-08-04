<?php

namespace App\Criteria\Categories\EloquentClauses;

use App\Criteria\Categories\CategoriesCriteriaInterface;
use App\Criteria\Categories\CategoriesCriteria;
use App\Repositories\Categories\CategoriesRepository;


class UserEqualsID extends CategoriesCriteria
{
	private $condition;
	
	public function __construct($condition){
		$this->condition = $condition;
	}
	public function apply($model, CategoriesRepository $repository){
		$model = $model->where("user_id","=",$this->condition);
		return $model;
	}
	
}