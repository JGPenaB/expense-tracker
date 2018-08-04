<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Tymon\JWTAuth\JWTAuth;
use App\Models\User;

class AuthController extends Controller
{
	private $jwt;
	//private $user;
	
	public function __construct(JWTAuth $jwt){
		$this->jwt = $jwt;
		//$this->user = $user;
	}
	
	
	public function login(Request $request){
        $credentials = $request->only('email', 'password');
        try 
		{
            if (!$token = $this->jwt->attempt($credentials)) 
                return response()->json(['error' => 'invalid_credentials'], 401);

        } catch (JWTException $e) 
		{
            return response()->json(['error' => 'could_not_create_token'], 500);
        }
        $user = $this->jwt->authenticate($token);
        return response()->json(compact('token','user'));
    }
	
	
	public function logout(){
        $this->jwt->invalidate($this->jwt->getToken());
        return response()->json(['logout']);
    }
	
	public function getAuthenticatedUser()
    {
        try {

            if (! $user = $this->jwt->parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }

        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {

            return response()->json(['error'=>'token_absent'], $e->getStatusCode());

        }
        return response()->json(compact('user'));
    }
	
}
