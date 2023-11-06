<?php

namespace App\Http\Controllers;

use App\Models\Graph;
use App\Models\Node;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AStarController extends Controller
{
    // function haversine($start, $goal)
    // {
    //     // Radius bumi dalam kilometer
    //     $radius = 6371;


    //     $graph = Graph::join('nodes as startNode', 'start', '=', 'startNode.id')
    //     ->join('nodes as endNode', 'end', '=', 'endNode.id')
    //     ->where('start', $start)
    //     ->where('end', $goal)
    //         ->select('start', 'end', 'startNode.name as nameStart', 'startNode.lat as latStart', 'startNode.lng as lngStart', 'endNode.name as nameEnd', 'endNode.lat as latEnd', 'endNode.lng as lngEnd', 'distance')
    //         ->first();
    //     // Konversi derajat ke radian
    //     $lat1 = deg2rad($graph->latStart);
    //     $lon1 = deg2rad($graph->lngStart);
    //     $lat2 = deg2rad($graph->latEnd);
    //     $lon2 = deg2rad($graph->lngEnd);

    //     // Haversine formula
    //     $dlat = $lat2 - $lat1;
    //     $dlon = $lon2 - $lon1;
    //     $a = sin($dlat / 2) ** 2 + cos($lat1) * cos($lat2) * sin($dlon / 2) ** 2;
    //     $c = 2 * atan2(sqrt($a), sqrt(1 - $a));

    //     // Jarak dalam kilometer
    //     $distance = $radius * $c;
    //     return $distance;
    // }
    // function aStar($start, $goal, $nodes)
    // {
    //     $openSet = [$start];
    //     $cameFrom = [];
    //     $gScore = [];
    //     $fScore = [];
    //     $gScore[$start] = 0;
    //     $fScore[$start] = $this->haversine($start, $goal);

    //     while (!empty($openSet)) {
    //         // Cari simpul dengan fScore terendah
    //         $current = null;
    //         $minFScore = PHP_INT_MAX;
    //         foreach ($openSet as $node) {
    //             if ($fScore[$node] < $minFScore) {
    //                 $current = $node;
    //                 $minFScore = $fScore[$node];
    //             }
    //         }

    //         if ($current === $goal) {
    //             // Path ditemukan, rekonstruksi path
    //             $path = [];
    //             while (array_key_exists($current, $cameFrom)) {
    //                 array_unshift($path, $current);
    //                 $current = $cameFrom[$current];
    //             }
    //             array_unshift($path, $start);
    //             return $path;
    //         }

    //         // Pindahkan $current dari $openSet ke $closedSet
    //         $openSet = array_values(array_diff($openSet, [$current]));

    //         // Eksplorasi tetangga
    //         foreach ($nodes[$current] as $neighbor) {
    //             $tentativeGScore = $gScore[$current] + $this->haversine($current, $neighbor);

    //             if (!array_key_exists($neighbor, $gScore) || $tentativeGScore < $gScore[$neighbor]) {
    //                 // Ditemukan jalur yang lebih baik
    //                 $cameFrom[$neighbor] = $current;
    //                 $gScore[$neighbor] = $tentativeGScore;
    //                 $fScore[$neighbor] = $gScore[$neighbor] + $this->haversine($neighbor, $goal);
    //                 if (!in_array($neighbor, $openSet)) {
    //                     $openSet[] = $neighbor;
    //                 }
    //             }
    //         }
    //     }

    //     // Tidak ada path yang ditemukan
    //     return [];
    // }
    function haversine($lat1, $lon1, $lat2, $lon2)
    {
        $radius = 6371;
        $lat1 = deg2rad($lat1);
        $lon1 = deg2rad($lon1);
        $lat2 = deg2rad($lat2);
        $lon2 = deg2rad($lon2);
        $dlat = $lat2 - $lat1;
        $dlon = $lon2 - $lon1;
        $a = sin($dlat / 2) * sin($dlat / 2) + cos($lat1) * cos($lat2) * sin($dlon / 2) * sin($dlon / 2);
        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));
        $distance = $radius * $c;
        return $distance;
    }

    // IEU JALAN
    // function aStar($start, $goal, $nodes)
    // {
    //     $startNode = Node::find($start);
    //     $goalNode = Node::find($goal);
    //     $openSet = [$startNode->id];
    //     $cameFrom = [];
    //     $gScore = [];
    //     $fScore = [];
    //     $gScore[$startNode->id] = 0;
    //     $fScore[$startNode->id] = $this->haversine($startNode->lat, $startNode->lng, $goalNode->lat, $goalNode->lng);
    //     $start_time = microtime(true);
    //     while (!empty($openSet)) {
    //         $current = null;
    //         $minFScore = PHP_INT_MAX;
    //         foreach ($openSet as $nodeId) {
    //             if ($fScore[$nodeId] < $minFScore) {
    //                 $current = $nodeId;
    //                 $minFScore = $fScore[$nodeId];
    //             }
    //         }

    //         if ($current === $goalNode->id) {
    //             $path = [];
    //             while (array_key_exists($current, $cameFrom)) {
    //                 array_unshift($path, $current);
    //                 $current = $cameFrom[$current];
    //             }
    //             array_unshift($path, $startNode->id);
    //             return $path;
    //         }

    //         $openSet = array_values(array_diff($openSet,
    //             [$current]
    //         ));

    //         if (!empty($nodes[$current])) {
    //             foreach ($nodes[$current] as $neighbor => $distance) {
    //                 $neighborNode = Node::find($neighbor);
    //                 $tentativeGScore = $gScore[$current] + floatval($distance);

    //                 if (!array_key_exists($neighbor, $gScore) || $tentativeGScore < $gScore[$neighbor]) {
    //                     $cameFrom[$neighbor] = $current;
    //                     $gScore[$neighbor] = $tentativeGScore;
    //                     $fScore[$neighbor] = $gScore[$neighbor] + $this->haversine(
    //                         $neighborNode->lat,
    //                         $neighborNode->lng,
    //                         $goalNode->lat,
    //                         $goalNode->lng
    //                     );
    //                     if (!in_array($neighbor, $openSet)) {
    //                         $openSet[] = $neighbor;
    //                     }
    //                 }
    //             }
    //         }
    //     }
    //     $end_time = microtime(true);
    //     $execution_time = ($end_time - $start_time);
    //     return [];
    // }
    function aStar($start, $goal, $nodes)
    {
        $startNode = Node::find($start);
        $goalNode = Node::find($goal);
        $openSet = [$startNode->id];
        $cameFrom = [];
        $gScore = [];
        $fScore = [];
        $gScore[$startNode->id] = 0;
        $fScore[$startNode->id] = $this->haversine($startNode->lat, $startNode->lng, $goalNode->lat, $goalNode->lng);
        $start_time = microtime(true);

        while (!empty($openSet)) {
            $end_time = microtime(true);
            $current = null;
            $minFScore = PHP_INT_MAX;
            foreach ($openSet as $nodeId) {
                if ($fScore[$nodeId] < $minFScore) {
                    $current = $nodeId;
                    $minFScore = $fScore[$nodeId];
                }
            }

            if ($current === $goalNode->id) {
                $path = [];
                while (array_key_exists($current, $cameFrom)) {
                    array_unshift($path, $current);
                    $current = $cameFrom[$current];
                }
                array_unshift($path, $startNode->id);

                $execution_time = ($end_time - $start_time);
                // echo "Execution Time: " . $execution_time . " seconds"; // Mencetak waktu eksekusi
                return ['path' => $path, 'execution_time' => $execution_time]; // Mengembalikan path dan waktu eksekusi
            }

            $openSet = array_values(array_diff($openSet, [$current]));

            if (!empty($nodes[$current])) {
                foreach ($nodes[$current] as $neighbor => $distance) {
                    $neighborNode = Node::find($neighbor);
                    $tentativeGScore = $gScore[$current] + floatval($distance);

                    if (!array_key_exists($neighbor, $gScore) || $tentativeGScore < $gScore[$neighbor]) {
                        $cameFrom[$neighbor] = $current;
                        $gScore[$neighbor] = $tentativeGScore;
                        $fScore[$neighbor] = $gScore[$neighbor] + $this->haversine(
                            $neighborNode->lat,
                            $neighborNode->lng,
                            $goalNode->lat,
                            $goalNode->lng
                        );
                        if (!in_array($neighbor, $openSet)) {
                            $openSet[] = $neighbor;
                        }
                    }
                }
            }
        }
        $end_time = microtime(true);
        $execution_time = ($end_time - $start_time);
        // echo "Execution Time: " . $execution_time . " seconds"; // Mencetak waktu eksekusi
        return ['path' => [], 'execution_time' => $execution_time]; // Mengembalikan waktu eksekusi jika tidak ada path ditemukan
    }


}
