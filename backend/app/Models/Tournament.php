<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Tournament extends Model
{
    use HasFactory;

    protected $fillable = [ 'title' ];

    // This does default eager loading
    protected $with = ['results', 'results.players'];
 

    public function results(): HasMany
    {
        return $this->hasMany(TournamentResult::class);
    }

    public function series(): BelongsToMany
    {
        return $this->belongsToMany(Series::class, 'series_tournament');
    }


}
