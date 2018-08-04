<?php

namespace App\Repositories\Transactions;

interface TransactionsRepository
{
    function all();
	
	function getById($id);
	
	function store($user_id, $category_id, array $attributes);
	
	function update($id, array $attributes);
	
	function delete($id);
}
