<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Presenters\CategoryPresenter;
use McCool\LaravelAutoPresenter\HasPresenter;

class Categories extends Model implements HasPresenter
{
	protected $fillable = ['user_id','name'];
	
	public function getPresenterClass(){
		return CategoryPresenter::class;
	}
}
