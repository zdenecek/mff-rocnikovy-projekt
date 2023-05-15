<?php

namespace App\Models;

enum TournamentType: string {
    case Pairs = 'pairs';
    case Teams = 'teams';
    case Individual = 'individual';
}