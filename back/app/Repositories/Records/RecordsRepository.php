<?php

namespace App\Repositories\Records;

interface RecordsRepository
{
    function all($user_id);
	
	function getById($id);
	
	function store($id_user, array $attributes);
	
	function update($id, array $attributes);
	
	function delete($id);
	
}
