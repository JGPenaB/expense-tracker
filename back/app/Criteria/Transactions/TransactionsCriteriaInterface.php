<?php

namespace App\Criteria\Transactions;

use App\Criteria\Transactions\TransactionsCriteria as TCriteria;

interface TransactionsCriteriaInterface
{
	public function getCriteria();
	
	public function getByCriteria(TCriteria $criteria);
	
	public function pushCriteria(TCriteria $criteria);
	
	public function applyCriteria();
}
