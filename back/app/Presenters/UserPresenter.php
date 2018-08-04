<?php

namespace App\Presenters;

use Carbon\Carbon;
use App\Models\User;
use McCool\LaravelAutoPresenter\BasePresenter;

class UserPresenter extends BasePresenter
{
	public function created_at(){
		$created = $this->wrappedObject->created_at;
		return Carbon::createFromFormat($created)->toFormattedDateString();
	}
}