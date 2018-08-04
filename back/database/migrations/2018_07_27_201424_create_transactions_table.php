<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTransactionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //Transaction table
        Schema::create('transactions', function (Blueprint $table) {
            $table->increments('id');
			$table->integer('category_id');
			$table->integer('user_id');
			$table->string('subject');
			$table->integer('amount');
			$table->date('date');
			$table->string('type');
			
            $table->timestamps();
			
			$table->foreign('category_id')->references('id')->on('categories');
			$table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('transactions');
    }
}
