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
        Schema::create('series', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
        });

        Schema::create('series_tournament', function (Blueprint $table) {
            $table->id();
            $table->foreignId('series_id')->constrained();
            $table->foreignId('tournament_id')->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('series');
        Schema::dropIfExists('series_tournament');
    }
};
