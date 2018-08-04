<?php

namespace App\Presenters;

use Carbon\Carbon;
use App\Models\Transactions;
use McCool\LaravelAutoPresenter\BasePresenter;

class TransactionPresenter extends BasePresenter
{
	public function subject(){
		return "warped: ".$this->wrappedObject->subject;
	}
}