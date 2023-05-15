<?php

namespace Database\Factories;

use App\Models\Player;
use App\Models\Tournament;
use App\Models\TournamentResult;
use App\Models\TournamentType;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\Sequence;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TournamentResult>
 */
class TournamentResultFactory extends Factory
{

    public function configure()
    {
        return $this->afterCreating(function (TournamentResult $result) {
            if($result->tournament->type === TournamentType::Teams) {
                $this->title = $this->faker->catch_phrase();
            }
        });
    }

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
        ];
    }

    public function team(): Factory
    {
        return $this->state(
            [
                'title' => $this->faker->catchPhrase(),
            ]
        );
    }

    public function createForTournament(Tournament $tournament)
    {
        $playerCount = $tournament->type === TournamentType::Teams ? 4 :
        ($tournament->type === TournamentType::Pairs ? 2 : 1);

        return ($tournament->type === TournamentType::Teams ? $this->team() : $this)
            ->recycle(Player::all())
            ->state(new Sequence(
                fn (Sequence $sequence) => ['rank' => $sequence->index + 1],
            ))
            ->hasPlayers($playerCount)
            ->create(
                [
                    'tournament_id' => $tournament->id,
                ]
            );
    }
}
