<?php

namespace Database\Seeders;

use App\Models\Tournament;
use App\Models\TournamentResult;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TournamentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tournaments = Tournament::factory()
        ->count(10)
        ->create();
    }
}
