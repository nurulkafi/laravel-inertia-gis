<?php

namespace App\Http\Controllers;

use App\Models\Graph;
use App\Models\Node;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AlgoritmaController extends Controller
{
    public function index()
    {
        return Inertia::render('Algoritma/Djikstra/Index', [
            'map_token' => env("MAP_BOX_API_KEY"),
            'node' => Node::get(),
        ]);
    }
    public function indexAstar()
    {
        return Inertia::render('Algoritma/Astar/Index', [
            'map_token' => env("MAP_BOX_API_KEY"),
            'node' => Node::get(),
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
                        ->select('start', 'end', 'startNode.name as nameStart', 'startNode.lat as latStart', 'startNode.lng as lngStart', 'endNode.name as nameEnd', 'endNode.lat as latEnd', 'endNode.lng as lngEnd', 'distance')
                        ->first();

                    if ($neighbor) {
                        $pathData[] = $neighbor;
                    }
                }

                $result_all_path[] = $pathData;
            }
        }else{
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
                    ->select('start', 'end', 'startNode.name as nameStart', 'startNode.lat as latStart', 'startNode.lng as lngStart', 'endNode.name as nameEnd', 'endNode.lat as latEnd', 'endNode.lng as lngEnd', 'distance')

                    ->first();

                if ($neighbor) {
                    $result_shortpath[] = $neighbor;
                }
            }
        }else{
            $result_shortpath =[];
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
                $distance = $neighbor->distance;

                // Pastikan neighborId tidak sama dengan id node saat ini
                if ($neighborId != $node->id) {
                    $graph[$node->id][$neighborId] = $distance;
                }
            }
        }
        $shortpath = $asta->aStar((int)$titikMulai, (int)$titikTujuan, $graph);
        // $shortpath = $this->findShortestPath((int)$titikMulai, (int)$titikTujuan);
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
                        ->select('start', 'end', 'startNode.name as nameStart', 'startNode.lat as latStart', 'startNode.lng as lngStart', 'endNode.name as nameEnd', 'endNode.lat as latEnd', 'endNode.lng as lngEnd', 'distance')
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
                    ->select('start', 'end', 'startNode.name as nameStart', 'startNode.lat as latStart', 'startNode.lng as lngStart', 'endNode.name as nameEnd', 'endNode.lat as latEnd', 'endNode.lng as lngEnd', 'distance')

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
            'astar_execution_time' => $shortpath['execution_time'] ?? 0
        ];
        return response()->json($data, 200);
    }
    public function findShortestPath($start, $end)
    {
        // Load the entire graph into memory (assuming it's not too large)
        $nodes = Node::get();
        $graph = [];

        foreach ($nodes as $node) {
            // $neighbors = Graph::where('start', $node->id)->orWhere('end', $node->id)->get();
            $neighbors = Graph::where('start', $node->id)->get();

            $graph[$node->id] = [];

            foreach ($neighbors as $neighbor) {
                $neighborId = ($neighbor->start == $node->id) ? $neighbor->end : $neighbor->start;
                $distance = $neighbor->distance;

                // Ensure that neighborId is not the same as the current node's id
                if ($neighborId != $node->id) {
                    $graph[$node->id][$neighborId] = $distance;
                }
            }
        }

        $distances = [];
        $previous = [];
        $unvisited = $graph;
        $start_time = microtime(true);
        foreach ($unvisited as $node => $value) {
            $distances[$node] = INF;
        }

        $distances[$start] = 0;

        while (count($unvisited)) {
            $minNode = null;
            foreach ($unvisited as $node => $value) {
                if ($minNode === null || $distances[$node] < $distances[$minNode]) {
                    $minNode = $node;
                }
            }

            if ($minNode === $end) {
                break;
            }

            foreach ($graph[$minNode] as $neighbor => $value) {
                $alt = $distances[$minNode] + $value;
                if ($alt < $distances[$neighbor]) {
                    $distances[$neighbor] = $alt;
                    $previous[$neighbor] = $minNode;
                }
            }

            unset($unvisited[$minNode]);
        }

        $path = [];
        $node = $end;
        while (isset($previous[$node])) {
            $path[] = $node;
            $node = $previous[$node];
        }
        $end_time = microtime(true);
        $path[] = $start;
        $execution_time = ($end_time - $start_time);
        // Check if a path is found, otherwise, return an error message or handle accordingly.
        if (count($path) <= 1) {
            return "No path found.";
        }

        // return array_reverse($path);
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
                $distance = $neighbor->distance;

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
}
