@extends('layouts.app')

@section('content')
    <form action="{{ route('tournaments.store') }}" method="post">
        @csrf
        <label for="tournament_name">Tournament Name:</label>
        <input type="text" id="tournament_name" name="tournament_name" required><br><br>

        <label for="start_date">Start Date:</label>
        <input type="date" id="start_date" name="start_date" required><br><br>

        <label for="end_date">End Date:</label>
        <input type="date" id="end_date" name="end_date" required><br><br>

        <label for="location">Location:</label>
        <input type="text" id="location" name="location" required><br><br>

        <input type="submit" value="Register">
    </form>
@endsection
