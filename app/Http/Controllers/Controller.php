<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;
    // public function updateNode()
    // {
    //     try {
    //         // Pemanggilan HTTP dilakukan di luar loop node
    //         $response = Http::get("https://data.traffic.hereapi.com/v7/flow?in=circle:-6.9018171475575,107.53609397738;r=10000&apiKey=I1UVxb4Tk7gzeKoX8OrmvwA140CnQmU4aDd-m5aAOpM&locationReferencing=shape");
    //         $data = $response->json();

    //         if (!$response->successful() || !isset($data['results'])) {
    //             return response()->json(['error' => 'Failed to fetch or parse API response'], 500);
    //         }

    //         $results = $data['results'];


    //         // Loop melalui setiap node
    //         $nodes = Node::get();

    //         foreach ($nodes as $node) {
    //             // Menggunakan query langsung untuk mendapatkan graf terkait
    //             $graphs = Graph::where('start', $node->id)->get();

    //             foreach ($graphs as $graph) {
    //                 $startNode = Node::find($graph->start);
    //                 $endNode = Node::find($graph->end);

    //                 // Periksa apakah node ditemukan sebelum mengakses propertinya
    //                 if ($startNode && $endNode) {
    //                     $distanceAwal = $this->haversine($startNode->lat, $startNode->lng, $endNode->lat, $endNode->lng);
    //                     $isFound = false;

    //                     foreach ($results as $result) {
    //                         $shapeLinks = $result['location']['shape']['links'];

    //                         foreach ($shapeLinks as $link) {
    //                             foreach ($link['points'] as $point) {
    //                                 $haversine = $this->haversine($startNode->lat, $startNode->lng, $point['lat'], $point['lng']);

    //                                 if ($haversine <= 0.05) {
    //                                     $isFound = true;
    //                                     break 3; // Keluar dari semua loop
    //                                 }
    //                             }
    //                         }

    //                         if ($isFound) {
    //                             $jamFactor = $result['currentFlow']['jamFactor'] / 100;
    //                             $distance = $distanceAwal + $jamFactor;

    //                             // Gunakan metode update langsung pada model Graph
    //                             Graph::where('id', $graph->id)->update(['distance' => $distance, 'time' => 2]);
    //                             break; // Keluar dari loop result
    //                         }
    //                     }
    //                 }
    //             }
    //         }

    //         // Pindahkan return statement di luar loop jika perlu
    //         return response()->json(['message' => 'Graph updated successfully'], 200);
    //     } catch (\Exception $e) {
    //         return response()->json(['error' => $e->getMessage()], 500);
    //     }
    // }
    // public function updateNode()
    // {
    //     try {
    //         $graph = Graph::with(['startCoordinate', 'endCoordinate'])->get();

    //         DB::beginTransaction();

    //         foreach ($graph as $g) {
    //             $startCoordinate = $g->startCoordinate;
    //             $endCoordinate = $g->endCoordinate;

    //             $distanceAwal = $this->haversine($startCoordinate->lat, $startCoordinate->lng, $endCoordinate->lat, $endCoordinate->lng);

    //             $response = Cache::remember('traffic_data', now()->addMinutes(5), function () use ($startCoordinate) {
    //                 $response = Http::get("https://data.traffic.hereapi.com/v7/flow?in=circle:" . $startCoordinate->lat . ",$startCoordinate->lng;r=50&apiKey=I1UVxb4Tk7gzeKoX8OrmvwA140CnQmU4aDd-m5aAOpM&locationReferencing=shape");
    //             });

    //             if (isset($response['results'])) {
    //                 $results = $response['results'];


    //                 foreach ($results as $result) {
    //                     $location = $result['location'];
    //                     $shapeLinks = $location['shape']['links'];

    //                     $isFound = false;
    //                     foreach ($shapeLinks as $link) {
    //                         $points = $link['points'];

    //                         foreach ($points as $point) {
    //                             $lat = $point['lat'];
    //                             $lng = $point['lng'];
    //                             $haversine = $this->haversine($startCoordinate->lat, $startCoordinate->lng, $lat, $lng);

    //                             if ($haversine <= 0.05) {
    //                                 $isFound = true;
    //                                 break 3; // Keluar dari kedua loop
    //                             }
    //                         }
    //                     }

    //                     if ($isFound) {
    //                         $jamFactor = $result['currentFlow']['jamFactor'];
    //                         // $jamFactor = $jamFactor / 100;
    //                         $distance = $distanceAwal + $jamFactor;

    //                         // Gunakan metode update langsung pada model Graph
    //                         $updatedGraph = Graph::findOrFail($g->id);
    //                         $updatedGraph->bobot = $distance;
    //                         $updatedGraph->tingkatKemacetan = $jamFactor;
    //                         $updatedGraph->lastUpdate = $response['sourceUpdated'];
    //                         $updatedGraph->save();
    //                     }
    //                 }
    //             }
    //         }

    //         DB::commit();

    //         return response()->json(['message' => 'Graph updated successfully'], 200);
    //     } catch (\Exception $e) {
    //         DB::rollback();
    //         return response()->json(['error' => $e->getMessage()], 500);
    //     }
    // }
}
