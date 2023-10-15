<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
class ConsumableApiController extends Controller
{
    //
    public function getLocationInfo(Request $request)
    {
        $lat = $request->input('lat');
        $long = $request->input('lng');

        try {
            $response = Http::get("https://api.geoapify.com/v1/geocode/reverse?lat=$lat&lon=$long&format=json&apiKey=e712c851f0cd4ac7aeba0cfc7f6ef80c");

            $data = $response->json();

            if ($response->successful()) {
                return response()->json($data, 200);
            }

            return response()->json($response->body(), $response->status());
        } catch (\Exception $e) {
            return response()->json(['error' => 'Terjadi kesalahan saat mengakses API'], 500);
        }
    }


}
