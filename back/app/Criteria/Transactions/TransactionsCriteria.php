<?php

namespace App\Criteria\Transactions;

use App\Repositories\Transactions\TransactionsRepository;

abstract class TransactionsCriteria
{
	public abstract function apply($model, TransactionsRepository $repo);
}
