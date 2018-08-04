<?php

namespace App\Criteria\Categories;

use App\Criteria\Categories\CategoriesCriteria as CCriteria;

interface CategoriesCriteriaInterface
{
	public function getCriteria();
	
	public function getByCriteria(CCriteria $criteria);
	
	public function pushCriteria(CCriteria $criteria);
	
	public function applyCriteria();
}
