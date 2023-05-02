<?php

namespace Database\Factories;

use App\Models\Player;
use App\Models\Tournament;
use App\Models\TournamentResult;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\TournamentType;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Sequence;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tournament>
 */
class TournamentFactory extends Factory
{
    public function configure()
    {
        return $this->afterCreating(function (Tournament $tournament) {
            $resultCount = $this->faker->numberBetween(20, 40);

            $tournament->results()->saveMany(
                TournamentResult::factory()
                    ->count($resultCount)
                    ->createForTournament($tournament)
            );
        });
    }



    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {


        $date = Carbon::create($this->faker->date());
        $otherDate = $date->addDays($this->faker->numberBetween(1, 10));

        $type = $this->faker->randomElement(["Grand Prix", "Super Series", "Major", "Minor", "Invitational", "Qualifier", "Regional", "National", "Local", "Other"]);
        $city = $this->faker->city();
        $country = $this->faker->country();
        $location = $city . ", " . $country;
        $title = $type . " " . $location;

        return [
            'title' => $title,
            'type' => $this->faker->randomElement(TournamentType::cases()),
            'start_date' => $date,
            'end_date' => $otherDate,
            'location' => $location,
            'description' => $this->faker->text(),
        ];
    }
}
