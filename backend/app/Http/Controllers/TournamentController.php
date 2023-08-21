<?php

namespace App\Http\Controllers;

use App\Models\Tournament;
use App\Models\TournamentResult;
use Illuminate\Http\Request;

class TournamentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $request->validate([
            'per_page' => 'integer|max:100',
            'page' => 'integer|min:1',
        ]);


        $per_page = $request->input('per_page', 15);
        $page = $request->input('page', 1);

        return Tournament::paginate($per_page, ['*'], 'page', $page);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'startDate' => 'required|date',
            'endDate' => 'required|date|after_or_equal:startDate',
            'location' => 'required|string|max:255'
        ]);
    
        // Storing the validated data in the database
        return Tournament::create($data);
    
    
    }

    /**
     * Display the specified resource.
     */
    public function show(Tournament $tournament)
    {
        //return Tournament::with('results', 'results.players')->find($tournament->id);
        
        return $tournament;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tournament $tournament)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'startDate' => 'required|date',
            'endDate' => 'required|date|after_or_equal:startDate',
            'location' => 'required|string|max:255'
        ]);
    
        // Storing the validated data in the database
        $tournament->update($data);
    
        return $tournament;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tournament $tournament)
    {
        $tournament->delete();

        return response()->json(['message' => 'Tournament deleted successfully.'], 200);
    }
        
}
