<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class User_Request extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
	
	public function rules()
    {
		switch($this->method())
		{
			case 'POST':
			{
				return [
					'name' =>'required|max:200',
					'email'=>['required','email','max:200','unique:users,email'],
					'password' => 'required',
				];
			}
			break;
			
			case 'PUT':
			{
				return [
					'name' =>'max:200',
					'email'=>['email','max:200','unique:users,email'],
					'password' => 'max:200',
				];
			}
			break;
		}
    }

    protected function failedValidation(Validator $validator) { 
        throw new HttpResponseException(response()->json($validator->errors()->all(), 422)); 
    }
}
