<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('auth/login', 'Api\AuthController@login');
Route::post('auth/register', 'Api\UserController@RegistrarUsuario');

//Rutas protegidas por JWT
Route::group(['middleware' => ['jwt.auth',] ], function () {
	Route::get('auth/logout', 'Api\AuthController@logout');
	
	//Rutas para los usuarios
	Route::get('auth/current','Api\AuthController@getAuthenticatedUser');
	Route::get('users','Api\UserController@ObtenerListaUsuarios');
	Route::get('users/{id}','Api\UserController@ObtenerUsuario');
	Route::put('users/{id}','Api\UserController@ActualizarUsuario');
	//Route::delete('users/{id}','Api\UserController@EliminarUsuario');

	//Rutas para las categorias
	Route::post('users/{id_user}/categories/register', 'Api\CategoryController@RegistrarCategoria');
	Route::get('users/{id_user}/categories','Api\CategoryController@ObtenerListaCategorias');
	Route::get('users/categories/{id}','Api\CategoryController@ObtenerCategoria');
	Route::put('users/categories/{id}','Api\CategoryController@EditarCategoria');
	Route::delete('users/categories/{id}','Api\CategoryController@EliminarCategoria');

	//Route para las transacciones
	Route::post('users/{user_id}/categories/{category_id}/transactions/register','Api\TransactionsController@RegistrarTransaccion');
	Route::get('users/{user_id}/categories/transactions','Api\TransactionsController@ObtenerListaTransacciones');

	Route::get('users/{user_id}/categories/transactions/lastweek','Api\TransactionsController@ObtenerTransaccionesSemana');
	Route::get('users/{user_id}/categories/transactions/lastmonth','Api\TransactionsController@ObtenerTransaccionesMes');
	Route::get('users/{user_id}/categories/transactions/lastyear','Api\TransactionsController@ObtenerTransaccionesAño');

	Route::get('users/categories/transactions/{id}','Api\TransactionsController@ObtenerTransaccion');
	Route::put('users/categories/transactions/{id}','Api\TransactionsController@ActualizarTransaccion');
	Route::delete('users/categories/transactions/{id}','Api\TransactionsController@EliminarTransaccion');

	//Route para los registros
	Route::post('users/{user_id}/records/register','Api\RecordController@RegistrarRecord');
	Route::get('users/{user_id}/records','Api\RecordController@ObtenerListaRecord');
	Route::get('users/records/{id}','Api\RecordController@ObtenerRecord');
});

