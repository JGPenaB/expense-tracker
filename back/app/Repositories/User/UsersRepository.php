<?php

namespace App\Repositories\User;


interface UsersRepository
{
    function all();
	
	function getById($id);
	
	function store(array $attributes);
	
	function update($id, array $attributes);
	
	function delete($id);
	
}
