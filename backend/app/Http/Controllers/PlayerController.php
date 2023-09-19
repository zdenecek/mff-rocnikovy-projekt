<?php

namespace App\Http\Controllers;

use App\Models\Player;
use Illuminate\Http\Request;

class PlayerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    
    public function index(Request $request)
    {
        $request->validate([
            'per_page' => 'integer',
            'page' => 'integer|min:1',
        ]);

        $per_page = $request->input('per_page', 15);
        $page = $request->input('page', 1);

        if($per_page < 1) return Player::all();
        return Player::paginate($per_page);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'string|required|min:3|max:255',
            'federationId' => 'integer|positive',
        ]);

        $player = Player::create([
            'name' => $request->input('name'),
            'federationId' => $request->input('federationId'),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Player $player) 
    {
        return $player;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Player $player)
    {
        $request->validate([
            'name' => 'string|min:3|max:255',
            'federationId' => 'integer|positive',
        ]);

        $player->update([
            'name' => $request->input('name'),
            'federationId' => $request->input('federationId'),
        ]);

        return $player;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Player $player)
    {
        $player->delete();
    }

    /**
     * Search for a name like
     */
    public function search(Request $request)
    {
        $possible_names = Player::query();

        
        if ($request->filled('q')){
            $possible_names->where('name', 'like', "%{$request->get('q')}%");
        }

        return $possible_names->limit(10)->get();
    }

    

}
