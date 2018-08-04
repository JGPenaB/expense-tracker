<?php

namespace App\Repositories\Categories;

interface CategoriesRepository
{
    function all($id_user);
	
	function getById($id);
	
	function store($id_user, array $attributes);
	
	function update($id, array $attributes);
	
	function delete($id);
}
