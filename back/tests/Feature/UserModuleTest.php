<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserModuleTest extends TestCase
{
    /**
     * Test if the user can login
     *
     * @return void
     */
    public function testBasicTest()
    {
        $response = $this->json('POST', 'auth/login', 
        [
            'email' => 'dana54@example.org', 
            'password' => 'secret'
        ]);
        
        dd($response->headers);
        $response
            ->assertStatus(200)
            ->assertJson([
                'created' => true,
            ]);
    }
}
