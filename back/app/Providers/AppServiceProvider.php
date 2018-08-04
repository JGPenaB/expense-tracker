<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use App\Repositories\User\UsersRepository;
use App\Repositories\User\EloquentUser;

use App\Repositories\Categories\CategoriesRepository;
use App\Repositories\Categories\EloquentCategory;

use App\Repositories\Transactions\TransactionsRepository;
use App\Repositories\Transactions\EloquentTransactions;

use App\Repositories\Records\RecordsRepository;
use App\Repositories\Records\EloquentRecord;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(UsersRepository::class, EloquentUser::class);
		$this->app->singleton(CategoriesRepository::class, EloquentCategory::class);
		$this->app->singleton(TransactionsRepository::class, EloquentTransactions::class);
		$this->app->singleton(RecordsRepository::class, EloquentRecord::class);
    }
}
