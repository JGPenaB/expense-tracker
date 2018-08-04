<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use App\Presenters\TransactionPresenter;
use McCool\LaravelAutoPresenter\HasPresenter;

class Transactions extends Model implements HasPresenter
{
    protected $fillable = ['user_id', 'category_id','subject','date','amount','type'];
	
	
	public function getPresenterClass(){
		return TransactionPresenter::class;
	}
}