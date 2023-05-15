<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    use HasFactory;

    protected $fillable = [ 'name', 'federation_id' ];

    public function results()
    {
        return $this->belongsToMany(TournamentResult::class, 'tournament_result_player');
    }
}
