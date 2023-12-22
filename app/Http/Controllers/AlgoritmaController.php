<?php

namespace App\Http\Controllers;

use App\Models\Graph;
use App\Models\Node;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;

class AlgoritmaController extends Controller
{
    public function index()
    {
        return Inertia::render('Algoritma/Djikstra/Index', [
            'map_token' => env("MAP_BOX_API_KEY"),
            'node' => Node::get(),
            'lastUpdate' => Node::whereNotNull('lastUpdate')->orderByDesc('lastUpdate')->first()
        ]);
    }
    public function indexAstar()
    {
        return Inertia::render('Algoritma/Astar/Index', [
            'map_token' => env("MAP_BOX_API_KEY"),
            'node' => Node::get(),
            'lastUpdate' => Node::whereNotNull('lastUpdate')->orderByDesc('lastUpdate')->first()
        ]);
    }
    public function getDataAlgoritmaDjikstraJson($titikMulai, $titikTujuan)
    {

        $shortpath = $this->findShortestPath((int)$titikMulai, (int)$titikTujuan);
        $allPath = $this->findLongestPaths((int)$titikMulai, (int)$titikTujuan);
        $allPath = array_values($allPath);
        // return count($allPath);die;
        if (count($allPath) !== 0) {
            for ($i = 0; $i < count($allPath); $i++) {
                $pathData = [];

                for ($j = 0; $j < count($allPath[$i]) - 1; $j++) {
                    $current_node = $allPath[$i][$j];
                    $next_node = $allPath[$i][$j + 1];

                    $neighbor = Graph::join('nodes as startNode', 'start', '=', 'startNode.id')
                        ->join('nodes as endNode', 'end', '=', 'endNode.id')
                        ->where('start', $current_node)
                        ->where('end', $next_node)
                        ->select('start', 'end', 'startNode.name as nameStart', 'startNode.lat as latStart', 'startNode.lng as lngStart', 'endNode.name as nameEnd', 'endNode.lat as latEnd', 'endNode.lng as lngEnd','endNode.tingkatKemacetan as tingkatKemacetanEnd','startNode.tingkatKemacetan as tingkatKemacetanStart', 'distance', 'startNode.tipeJalan as tipeJalanStart','endNode.tipeJalan as tipeJalanEnd')
                        // ->select('start', 'end', 'startNode.name as nameStart', 'startNode.lat as latStart', 'startNode.lng as lngStart', 'endNode.name as nameEnd', 'endNode.lat as latEnd', 'endNode.lng as lngEnd', 'distance', 'tingkatKemacetan', 'bobot')
                        ->first();

                    if ($neighbor) {
                        $pathData[] = $neighbor;
                    }
                }

                $result_all_path[] = $pathData;
            }
        } else {
            $result_all_path = [];
        }

        if ($shortpath !== "No path found.") {
            for ($i = 0; $i < count($shortpath['path']) - 1; $i++) {
                $current_node = $shortpath['path'][$i];
                $next_node = $shortpath['path'][$i + 1];

                $neighbor = Graph::join('nodes as startNode', 'start', '=', 'startNode.id')
                    ->join('nodes as endNode', 'end', '=', 'endNode.id')
                    ->where('start', $current_node)
                    ->where('end', $next_node)
                    ->select('start', 'end', 'startNode.name as nameStart', 'startNode.lat as latStart', 'startNode.lng as lngStart', 'endNode.name as nameEnd', 'endNode.lat as latEnd', 'endNode.lng as lngEnd','endNode.tingkatKemacetan as tingkatKemacetanEnd','startNode.tingkatKemacetan as tingkatKemacetanStart', 'distance', 'startNode.tipeJalan as tipeJalanStart','endNode.tipeJalan as tipeJalanEnd')
                    // ->select('start', 'end', 'startNode.name as nameStart', 'startNode.lat as latStart', 'startNode.lng as lngStart', 'endNode.name as nameEnd', 'endNode.lat as latEnd', 'endNode.lng as lngEnd', 'distance', 'tingkatKemacetan', 'bobot')

                    ->first();

                if ($neighbor) {
                    $result_shortpath[] = $neighbor;
                }
            }
        } else {
            $result_shortpath = [];
        }

        $data = [
            'shortpath' => $shortpath,
            'allPath' => $allPath,
            'result_algoritma_shortpath' => $result_shortpath,
            'result_all_path' => $result_all_path,
            'djikstra_execution_time' => $shortpath['execution_time'] ?? 0
        ];
        return response()->json($data, 200);
    }

    public function getDataAlgoritmaAstarJson($titikMulai, $titikTujuan)
    {
        $asta = new AStarController();
        // $haversine = $asta->haversine(6,8);
        $nodes = Node::get();
        $graph = [];

        // Inisialisasi array $graph
        foreach ($nodes as $node) {
            $graph[$node->id] = [];
        }

        // Mengisi array $graph dengan tetangga dan jarak
        foreach ($nodes as $node) {
            $neighbors = Graph::where('start', $node->id)->get();

            foreach ($neighbors as $neighbor) {
                $neighborId = ($neighbor->start == $node->id) ? $neighbor->end : $neighbor->start;
                $tingkatKemacetanStart = Node::findOrFail($neighbor->start)->tingkatKemacetan;
                $tingkatKemacetanEnd = Node::findOrFail($neighbor->end)->tingkatKemacetan;
                $tipeJalanStart = Node::findOrFail($neighbor->start)->tipeJalan;
                $tipeJalanEnd = Node::findOrFail($neighbor->end)->tipeJalan;
                $distance = $neighbor->distance + $tingkatKemacetanStart + $tingkatKemacetanEnd + $tipeJalanStart + $tipeJalanEnd;

                // Pastikan neighborId tidak sama dengan id node saat ini
                if ($neighborId != $node->id) {
                    $graph[$node->id][$neighborId] = $distance;
                }
            }
        }
        $shortpath = $asta->aStar((int)$titikMulai, (int)$titikTujuan, $graph);
        // $shortpath = $this->findShortestPath((int)$titikMulai, (int)$titikTujuan);
        $allPath = $this->findLongestPathsAstar((int)$titikMulai, (int)$titikTujuan);
        $allPath = array_values($allPath);
        // return count($allPath);die;
        if (count($allPath) !== 0) {
            for ($i = 0; $i < count($allPath); $i++) {
                $pathData = [];

                for ($j = 0; $j < count($allPath[$i]) - 1; $j++) {
                    $current_node = $allPath[$i][$j];
                    $next_node = $allPath[$i][$j + 1];

                    $neighbor = Graph::join('nodes as startNode', 'start', '=', 'startNode.id')
                        ->join('nodes as endNode', 'end', '=', 'endNode.id')
                        ->where('start', $current_node)
                        ->where('end', $next_node)
                        ->select('start', 'end', 'startNode.name as nameStart', 'startNode.lat as latStart', 'startNode.lng as lngStart', 'endNode.name as nameEnd', 'endNode.lat as latEnd', 'endNode.lng as lngEnd','endNode.tingkatKemacetan as tingkatKemacetanEnd','startNode.tingkatKemacetan as tingkatKemacetanStart', 'distance', 'startNode.tipeJalan as tipeJalanStart','endNode.tipeJalan as tipeJalanEnd')
                        ->first();

                    if ($neighbor) {
                        $pathData[] = $neighbor;
                    }
                }

                $result_all_path[] = $pathData;
            }
        } else {
            $result_all_path = [];
        }

        if ($shortpath !== "No path found.") {
            for ($i = 0; $i < count($shortpath['path']) - 1; $i++) {
                $current_node = $shortpath['path'][$i];
                $next_node = $shortpath['path'][$i + 1];

                $neighbor = Graph::join('nodes as startNode', 'start', '=', 'startNode.id')
                    ->join('nodes as endNode', 'end', '=', 'endNode.id')
                    ->where('start', $current_node)
                    ->where('end', $next_node)
                    ->select('start', 'end', 'startNode.name as nameStart', 'startNode.lat as latStart', 'startNode.lng as lngStart', 'endNode.name as nameEnd', 'endNode.lat as latEnd', 'endNode.lng as lngEnd','endNode.tingkatKemacetan as tingkatKemacetanEnd','startNode.tingkatKemacetan as tingkatKemacetanStart', 'distance', 'startNode.tipeJalan as tipeJalanStart','endNode.tipeJalan as tipeJalanEnd')
                    ->first();

                if ($neighbor) {
                    $result_shortpath[] = $neighbor;
                }
            }
        } else {
            $result_shortpath = [];
        }

        $data = [
            'shortpath' => $shortpath ?? null,
            'allPath' => $allPath ?? null,
            'result_algoritma_shortpath' => $result_shortpath ?? null,
            'result_all_path' => $result_all_path ?? null,
            'astar_execution_time' => $shortpath['execution_time'] ?? 0
        ];
        return response()->json($data, 200);
    }
    public function findShortestPath($start, $end)
    {
        // Memuat seluruh graf ke dalam memori (diasumsikan tidak terlalu besar)
        $nodes = Node::get(); // Mengambil semua node
        $graph = []; // Menginisialisasi graf kosong
        // $this->updateNode();
        // Membangun graf berdasarkan koneksi node
        foreach ($nodes as $node) {
            $neighbors = Graph::where('start', $node->id)->get(); // Mengambil tetangga dari node saat ini
            $graph[$node->id] = []; // Menginisialisasi array kosong untuk node saat ini

            foreach ($neighbors as $neighbor) {
                // Menentukan tetangga dan jarak ke tetangga
                $neighborId = ($neighbor->start == $node->id) ? $neighbor->end : $neighbor->start;
                $tingkatKemacetanStart = Node::findOrFail($neighbor->start)->tingkatKemacetan;
                $tingkatKemacetanEnd = Node::findOrFail($neighbor->end)->tingkatKemacetan;
                $tipeJalanStart = Node::findOrFail($neighbor->start)->tipeJalan;
                $tipeJalanEnd = Node::findOrFail($neighbor->end)->tipeJalan;
                $distance = $neighbor->distance + $tingkatKemacetanStart + $tingkatKemacetanEnd + $tipeJalanStart + $tipeJalanEnd;

                // Pastikan bahwa neighborId tidak sama dengan id node saat ini
                if ($neighborId != $node->id) {
                    $graph[$node->id][$neighborId] = $distance; // Menambahkan tetangga dan jarak ke graf
                }
            }
        }

        // Menginisialisasi variabel untuk algoritma Dijkstra
        $distances = [];
        $previous = [];
        $unvisited = $graph;
        $start_time = microtime(true);

        // Mengatur jarak awal, semuanya diatur ke infinity kecuali untuk node awal
        foreach ($unvisited as $node => $value) {
            $distances[$node] = INF;
        }
        $distances[$start] = 0;

        // Algoritma Dijkstra untuk menemukan jalur terpendek
        while (count($unvisited)) {
            $minNode = null;

            // Temukan node yang belum dikunjungi dengan jarak terkecil
            foreach ($unvisited as $node => $value) {
                if ($minNode === null || $distances[$node] < $distances[$minNode]) {
                    $minNode = $node;
                }
            }

            // Jika node minimum adalah tujuan, keluar dari loop
            if ($minNode === $end) {
                break;
            }

            // Perbarui jarak dan node sebelumnya untuk tetangga dari node saat ini
            foreach ($graph[$minNode] as $neighbor => $value) {
                $alt = $distances[$minNode] + $value;

                // Jika ditemukan jalur yang lebih pendek, perbarui jarak dan node sebelumnya
                if ($alt < $distances[$neighbor]) {
                    $distances[$neighbor] = $alt;
                    $previous[$neighbor] = $minNode;
                }
            }

            // Tandai node saat ini sebagai sudah dikunjungi
            unset($unvisited[$minNode]);
        }

        // Membangun kembali jalur terpendek
        $path = [];
        $node = $end;
        while (isset($previous[$node])) {
            $path[] = $node;
            $node = $previous[$node];
        }
        $end_time = microtime(true);
        $path[] = $start;
        $execution_time = ($end_time - $start_time);

        // Periksa apakah ditemukan jalur, jika tidak, kembalikan pesan kesalahan atau tangani sesuai kebutuhan.
        if (count($path) <= 1) {
            return "Tidak ada jalur ditemukan.";
        }

        // Kembalikan jalur yang dibalik dan waktu eksekusi
        return ["path" => array_reverse($path), "execution_time" => $execution_time];
    }

    public function findLongestPaths($start, $end)
    {
        $nodes = Node::get();
        $graph = [];

        foreach ($nodes as $node) {
            // $neighbors = Graph::where('start', $node->id)->orWhere('end', $node->id)->get();
            $neighbors = Graph::where('start', $node->id)->get();

            $graph[$node->id] = [];

            foreach ($neighbors as $neighbor) {
                $neighborId = ($neighbor->start == $node->id) ? $neighbor->end : $neighbor->start;
                $tingkatKemacetanStart = Node::findOrFail($neighbor->start)->tingkatKemacetan;
                $tingkatKemacetanEnd = Node::findOrFail($neighbor->end)->tingkatKemacetan;
                $tipeJalanStart = Node::findOrFail($neighbor->start)->tipeJalan;
                $tipeJalanEnd = Node::findOrFail($neighbor->end)->tipeJalan;
                $distance = $neighbor->distance + $tingkatKemacetanStart + $tingkatKemacetanEnd + $tipeJalanStart + $tipeJalanEnd;



                // Pastikan bahwa neighborId bukan sama dengan id node saat ini
                if ($neighborId != $node->id) {
                    $graph[$node->id][$neighborId] = $distance;
                }
            }
        }

        $allPaths = $this->findAllPaths($graph, $start, $end);
        $shortestPath = $this->findShortestPath($start, $end);

        // Filter rute terpendek
        $longestPaths = array_filter($allPaths, function ($path) use ($shortestPath) {
            return $path !== $shortestPath['path'];
        });

        return $longestPaths;
    }
    public function findLongestPathsAstar($start, $end)
    {
        $nodes = Node::get();
        $graph = [];

        foreach ($nodes as $node) {
            // $neighbors = Graph::where('start', $node->id)->orWhere('end', $node->id)->get();
            $neighbors = Graph::where('start', $node->id)->get();

            $graph[$node->id] = [];

            foreach ($neighbors as $neighbor) {
                $neighborId = ($neighbor->start == $node->id) ? $neighbor->end : $neighbor->start;
                $tingkatKemacetanStart = Node::findOrFail($neighbor->start)->tingkatKemacetan;
                $tingkatKemacetanEnd = Node::findOrFail($neighbor->end)->tingkatKemacetan;
                $tipeJalanStart = Node::findOrFail($neighbor->start)->tipeJalan;
                $tipeJalanEnd = Node::findOrFail($neighbor->end)->tipeJalan;
                $distance = $neighbor->distance + $tingkatKemacetanStart + $tingkatKemacetanEnd + $tipeJalanStart + $tipeJalanEnd;

                // Pastikan bahwa neighborId bukan sama dengan id node saat ini
                if ($neighborId != $node->id) {
                    $graph[$node->id][$neighborId] = $distance;
                }
            }
        }
        $asta = new AStarController();
        $allPaths = $this->findAllPaths($graph, $start, $end);
        $shortestPath = $asta->aStar((int)$start, (int)$end, $graph);

        // Filter rute terpendek
        $longestPaths = array_filter($allPaths, function ($path) use ($shortestPath) {
            return $path !== $shortestPath['path'];
        });

        return $longestPaths;
    }
    private function findAllPaths($graph, $current, $end, $path = [], $visited = [])
    {
        $path[] = $current;
        $visited[$current] = true;

        if ($current === $end) {
            return [$path];
        }

        $paths = [];

        foreach ($graph[$current] as $neighbor => $distance) {
            if (!isset($visited[$neighbor])) {
                $newPaths = $this->findAllPaths($graph, $neighbor, $end, $path, $visited);
                $paths = array_merge($paths, $newPaths);
            }
        }

        return $paths;
    }
    public function updateGraph()
    {
        try {
            $graph = Graph::get();
            foreach ($graph as $g) {
                $startCoordinate = Node::findOrFail($g->start);
                $endCoordinate = Node::findOrFail($g->end);
                $distanceAwal = $this->haversine($startCoordinate->lat, $startCoordinate->lng, $endCoordinate->lat, $endCoordinate->lng);
                $response = Http::get("https://data.traffic.hereapi.com/v7/flow?in=circle:" . $startCoordinate->lat . ",$startCoordinate->lng;r=50&apiKey=I1UVxb4Tk7gzeKoX8OrmvwA140CnQmU4aDd-m5aAOpM&locationReferencing=shape");
                $data = $response->json();

                if ($response->successful() && isset($data['results'])) {
                    $results = $data['results'];

                    foreach ($results as $result) {
                        $location = $result['location'];
                        $shapeLinks = $location['shape']['links'];

                        $isFound = false;

                        foreach ($shapeLinks as $link) {
                            $points = $link['points'];

                            foreach ($points as $point) {
                                $lat = $point['lat'];
                                $lng = $point['lng'];
                                $haversine = $this->haversine($startCoordinate->lat, $startCoordinate->lng, $lat, $lng);

                                if ($haversine <= 0.05) {
                                    $isFound = true;
                                }
                            }
                        }

                        if ($isFound) {
                            $jamFactors = $result['currentFlow']['jamFactor'];
                            // $jamFactor = $jamFactors / 100;
                            $distance = $distanceAwal + $jamFactors;

                            // Gunakan metode update langsung pada model Graph
                            $updatedGraph = Graph::findOrFail($g->id);
                            $updatedGraph->distance = $distanceAwal;
                            // $updatedGraph->time = 0;
                            $updatedGraph->bobot = $distance;
                            $updatedGraph->tingkatKemacetan = $jamFactors;
                            $updatedGraph->lastUpdate = $response['sourceUpdated'];
                            $updatedGraph->save();
                        }
                    }
                }
            }
            // Pindahkan return statement di luar loop jika perlu
            return response()->json(['message' => 'Graph updated successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    // public function updateNode()
    // {
    //     try {
    //         $node = Node::get();
    //         $prevNode = null;
    //         foreach ($node as $n) {
    //             $startCoordinate = Node::findOrFail($n->start);
    //             if ($prevNode) {
    //                 $distance = $this->haversine($n->lat, $n->lng, $prevNode->lat, $prevNode->lng);
    //                 if ($distance <= 0.1) {
    //                     # code...
    //                     $updateNode = Node::findOrFail($n->id);
    //                     // $updateNode->distance = $distanceAwal;
    //                     // $updateNode->time = 0;
    //                     // $updateNode->bobot = $distance;
    //                     $updateNode->tingkatKemacetan = $prevNode->tingkatKemacetan;
    //                     $updateNode->lastUpdate = $prevNode->lastUpdate;
    //                     $updateNode->save();
    //                 }else{
    //                     $response = Http::get("https://data.traffic.hereapi.com/v7/flow?in=circle:" . $n->lat . ",$n->lng;r=100&apiKey=I1UVxb4Tk7gzeKoX8OrmvwA140CnQmU4aDd-m5aAOpM&locationReferencing=shape");
    //                     $data = $response->json();

    //                     if ($response->successful() && isset($data['results'])) {
    //                         $results = $data['results'];

    //                         foreach ($results as $result) {
    //                             $location = $result['location'];
    //                             $shapeLinks = $location['shape']['links'];

    //                             $isFound = false;

    //                             foreach ($shapeLinks as $link) {
    //                                 $points = $link['points'];

    //                                 foreach ($points as $point) {
    //                                     $lat = $point['lat'];
    //                                     $lng = $point['lng'];
    //                                     $haversine = $this->haversine($startCoordinate->lat, $startCoordinate->lng, $lat, $lng);

    //                                     if ($haversine <= 0.010) {
    //                                         $isFound = true;
    //                                     }
    //                                 }
    //                             }

    //                             if ($isFound) {
    //                                 $jamFactors = $result['currentFlow']['jamFactor'];
    //                                 // $jamFactor = $jamFactors / 100;
    //                                 // $distance = $distanceAwal + $jamFactors;

    //                                 // Gunakan metode update langsung pada model Graph
    //                                 $updateNode = Node::findOrFail($n->id);
    //                                 // $updateNode->distance = $distanceAwal;
    //                                 // $updateNode->time = 0;
    //                                 // $updateNode->bobot = $distance;
    //                                 $updateNode->tingkatKemacetan = $jamFactors;
    //                                 $updateNode->lastUpdate = $response['sourceUpdated'];
    //                                 $updateNode->save();
    //                             }
    //                         }
    //                     }
    //                 }
    //             }

    //             $prevNode = $n;
    //         }
    //         // Pindahkan return statement di luar loop jika perlu
    //         return response()->json(['message' => 'Node updated successfully'], 200);
    //     } catch (\Exception $e) {
    //         return response()->json(['error' => $e->getMessage()], 500);
    //     }
    // }
    public function updateNode()
    {
        try {
            $node = Node::orderBy('id')->get();
            $prevNode = null;

            foreach ($node as $n) {
                if ($prevNode) {
                    $distance = $this->haversine($n->lat, $n->lng, $prevNode->lat, $prevNode->lng);

                    // if ($distance <= 0.1 && $prevNode->tingkatKemacetan != 0) {
                    if ($distance <= 0.05) {
                        $updateNode = Node::findOrFail($n->id);
                        $updateNode->tingkatKemacetan = $prevNode->tingkatKemacetan;
                        $updateNode->lastUpdate = $prevNode->lastUpdate;
                        $updateNode->save();
                    } else {
                        $response = Http::get("https://data.traffic.hereapi.com/v7/flow?in=circle:" . $n->lat . ",$n->lng;r=100&apiKey=I1UVxb4Tk7gzeKoX8OrmvwA140CnQmU4aDd-m5aAOpM&locationReferencing=shape");
                        $data = $response->json();

                        if ($response->successful() && isset($data['results'])) {
                            $results = $data['results'];

                            foreach ($results as $result) {
                                $location = $result['location'];
                                $shapeLinks = $location['shape']['links'];

                                $isFound = false;

                                foreach ($shapeLinks as $link) {
                                    $points = $link['points'];

                                    foreach ($points as $point) {
                                        $lat = $point['lat'];
                                        $lng = $point['lng'];
                                        $haversine = $this->haversine($n->lat, $n->lng, $lat, $lng);

                                        if ($haversine <= 0.01) {
                                            $isFound = true;
                                        }
                                    }
                                }

                                if ($isFound) {
                                    $jamFactors = $result['currentFlow']['jamFactor'];
                                    $updateNode = Node::findOrFail($n->id);
                                    $updateNode->tingkatKemacetan = $jamFactors;
                                    $updateNode->lastUpdate = $this->convertTimeToIndonesia($response['sourceUpdated']) ?? NULL; // default value jika 'sourceUpdated' tidak ada
                                    $updateNode->save();
                                } else {
                                    $updateNode = Node::findOrFail($n->id);
                                    $updateNode->tingkatKemacetan = 0;
                                    $updateNode->lastUpdate = $this->convertTimeToIndonesia($response['sourceUpdated']) ?? NULL; // default value jika 'sourceUpdated' tidak ada
                                    $updateNode->save();
                                }
                            }
                        }
                    }
                }else{
                    $response = Http::get("https://data.traffic.hereapi.com/v7/flow?in=circle:" . $n->lat . ",$n->lng;r=100&apiKey=I1UVxb4Tk7gzeKoX8OrmvwA140CnQmU4aDd-m5aAOpM&locationReferencing=shape");
                    $data = $response->json();

                    if ($response->successful() && isset($data['results'])) {
                        $results = $data['results'];

                        foreach ($results as $result) {
                            $location = $result['location'];
                            $shapeLinks = $location['shape']['links'];

                            $isFound = false;

                            foreach ($shapeLinks as $link) {
                                $points = $link['points'];

                                foreach ($points as $point) {
                                    $lat = $point['lat'];
                                    $lng = $point['lng'];
                                    $haversine = $this->haversine($n->lat, $n->lng, $lat, $lng);

                                    if ($haversine <= 0.010) {
                                        $isFound = true;
                                    }
                                }
                            }

                            if ($isFound) {
                                $jamFactors = $result['currentFlow']['jamFactor'];
                                $updateNode = Node::findOrFail($n->id);
                                $updateNode->tingkatKemacetan = $jamFactors;
                                $updateNode->lastUpdate = $this->convertTimeToIndonesia($response['sourceUpdated']) ?? NULL; // default value jika 'sourceUpdated' tidak ada
                                $updateNode->save();
                            } else {
                                $updateNode = Node::findOrFail($n->id);
                                $updateNode->tingkatKemacetan = 0;
                                $updateNode->lastUpdate = $this->convertTimeToIndonesia($response['sourceUpdated']) ?? NULL; // default value jika 'sourceUpdated' tidak ada
                                $updateNode->save();
                            }
                        }
                    }
                }
                $prevNode = $n;
            }

            return response()->json(['message' => 'Node updated successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
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
    public function convertTimeToIndonesia($utc_time)
    {
        // Buat objek Carbon dari waktu UTC
        $carbon_utc = Carbon::parse($utc_time);

        // Setel zona waktu ke Asia/Jakarta (Waktu Indonesia Barat)
        $carbon_utc->setTimezone('Asia/Jakarta');

        // Dapatkan waktu dalam format Indonesia
        $indonesia_time = $carbon_utc->toDateTimeString();

        return $indonesia_time;
    }
}
