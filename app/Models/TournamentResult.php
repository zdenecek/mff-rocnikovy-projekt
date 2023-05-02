<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class TournamentResult extends Model
{
    use HasFactory;

    protected $fillable = [ 'rank', 'title'];


    /**
     */
    public function tournament(): BelongsTo
    {
        return $this->belongsTo(Tournament::class);
    }

    public function players(): BelongsToMany
    {
        return $this->belongsToMany(Player::class, 'tournament_result_player');
    }
}
