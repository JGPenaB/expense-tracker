<?php

namespace App\Presenters;

use Carbon\Carbon;
use App\Models\Categories;
use McCool\LaravelAutoPresenter\BasePresenter;

class CategoryPresenter extends BasePresenter
{
	public function created_at(){
		$created = $this->wrappedObject->created_at;
		return Carbon::createFromFormat('Y-m-d H:i:s', $created)->toFormattedDateString();
	}
}