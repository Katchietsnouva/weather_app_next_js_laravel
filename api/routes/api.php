<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


// use Illuminate\Support\Facades\Http;

// Route::get('/weather', function (Request $request) {
//     $city = $request->query('city');

//     if (!$city) {
//         return response()->json(['error' => 'City is required'], 400);
//     }

//     $apiKey = env('OPENWEATHERMAP_API_KEY');
//     $weatherApiUrl = env('OPENWEATHERMAP_API_URL');

//     $response = Http::get("$weatherApiUrl/weather", [
//         'q' => $city,
//         'appid' => $apiKey,
//         'units' => 'metric'
//     ]);

//     if ($response->failed()) {
//         return response()->json(['error' => 'Unable to fetch weather data'], 500);
//     }

//     return $response->json();
// });

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});



