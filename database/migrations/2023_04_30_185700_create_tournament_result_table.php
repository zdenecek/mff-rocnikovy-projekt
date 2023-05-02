<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tournament_results', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tournament_id')->constrained();
            $table->string('title')->nullable();
            $table->integer('rank');
        });

        Schema::create('tournament_result_player', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tournament_result_id')->constrained();
            $table->foreignId('player_id')->constrained();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('series');
        Schema::dropIfExists('tournament_result_player');
    }
};
