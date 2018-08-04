<?php

namespace App\Models;


use Illuminate\Support\Facades\Hash;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Presenters\UserPresenter;

class User extends Authenticatable
{
	
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];
	
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'pivot', //'created_at', 'updated_at',
    ];
	
	/*
	 * Eloquent mutator para encriptar contraseña.
	 */
	public function setPasswordAttribute($pass){
		if(Hash::needsRehash($pass)){
			$this->attributes['password'] = bcrypt($pass);
		}
	}
	
}
