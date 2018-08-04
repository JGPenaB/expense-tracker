<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class Transaction_Request extends FormRequest
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
	
	//protected $fillable = ['category_id','subject','amount','type'];
	
	public function rules()
    {
		switch($this->method())
		{
			case 'POST':
			{
				return [
					'subject' =>'required|max:200',
					'amount'=>'required',
					'type' => 'required|max:200',
				];
			}
			break;
			
			case 'PUT':
			{
				return [
					'subject' =>'max:200',
					'amount'=>'',
					'type' => 'max:200',
				];
			}
			break;
		}
    }

    protected function failedValidation(Validator $validator) { 
        throw new HttpResponseException(response()->json($validator->errors()->all(), 422)); 
    }
}