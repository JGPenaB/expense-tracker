<?php

namespace App\Criteria\Categories;

use App\Repositories\Categories\CategoriesRepository;

abstract class CategoriesCriteria
{
	public abstract function apply($model, CategoriesRepository $repo);
}
