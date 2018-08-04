<?php

namespace App\Repositories\Categories;

use App\Models\Categories;
use App\Repositories\Categories\CategoriesRepository;
use App\Criteria\Categories\CategoriesCriteriaInterface;
use App\Criteria\Categories\CategoriesCriteria;

use Illuminate\Support\Collection;

Class EloquentCategory implements CategoriesRepository
{
	private $model;
	private $criteria;
	
	public function __construct(Categories $model, Collection $criteria){
		$this->model = $model;
		$this->criteria = $criteria;
	}
	
    public function all($id_user){
		$this->applyCriteria();
		return $this->model->get();
	}
	
	public function getById($id){
		$this->applyCriteria();
		return $this->model->find($id);
	}
	
	public function store($id_user, array $attributes){
		$attributes["user_id"]=$id_user;
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
	
	public function getByCriteria(CategoriesCriteria $criteria){
		$this->model = $criteria->apply($this->model, $this);
		return $this;
	}
	
	public function pushCriteria(CategoriesCriteria $criteria){
		$this->criteria->push($criteria);
		return $this;
	}
	
	public function applyCriteria(){
		foreach ($this->getCriteria() as $criteria){
			if($criteria instanceof CategoriesCriteria)
				$this->model = $criteria->apply($this->model, $this);
		}
		return $this;
	}
	
}