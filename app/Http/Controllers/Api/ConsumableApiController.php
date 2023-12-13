<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Graph;
use App\Models\Node;
use Carbon\Carbon;
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
    // public function generateNode()
    // {
    //     try {
    //         $response = Http::get("https://data.traffic.hereapi.com/v7/flow?in=circle:-6.9017724,107.5355892;r=2000&apiKey=I1UVxb4Tk7gzeKoX8OrmvwA140CnQmU4aDd-m5aAOpM&locationReferencing=shape");
    //         $data = $response->json();
    //         if ($response->successful()) {
    //             $result = $data['results'];
    //             // return response()->json($location, 200);
    //             foreach ($result as $res) {
    //                 $namaLokasi = $res['location'];
    //                 $kordinat = $res['location']['shape']['links'];
    //                 foreach ($kordinat as $cor) {
    //                     # code...
    //                     $points = $cor['points'];
    //                     foreach ($points as $point) {
    //                         $node = Node::create([
    //                             'name' => $namaLokasi,
    //                             'type' => "Jalan",
    //                             'lat' => $point['lat'],
    //                             'lng' => $point['lng'],
    //                             'picture' => 'picture',
    //                             'description' => 'description'
    //                         ]);
    //                         return response()->json($node, 200);
    //                     }
    //                 }
    //             }
    //         }
    //         return response()->json($response->body(), $response->status());
    //     } catch (\Exception $e) {
    //         return response()->json(['error' => $e->getMessage()], 500);
    //     }
    // }
    // public function generateNode()
    // {
    //     try {
    //         $response = Http::get("https://data.traffic.hereapi.com/v7/flow?in=circle:-6.9017724,107.5355892;r=2000&apiKey=I1UVxb4Tk7gzeKoX8OrmvwA140CnQmU4aDd-m5aAOpM&locationReferencing=shape");
    //         $data = $response->json();

    //         if ($response->successful()) {
    //             $results = $data['results'];
    //             $prevNodeId = null;
    //             foreach ($results as $result) {
    //                 $location = $result['location'];
    //                 $name = isset($location['description']) ? $location['description'] : 'Unknown'; // Menangani kunci yang mungkin tidak ada

    //                 $shapeLinks = $location['shape']['links'];

    //                 foreach ($shapeLinks as $link) {
    //                     $points = $link['points'];

    //                     foreach ($points as $point) {
    //                         $node = Node::create([
    //                             'name' => $name,
    //                             'type' => "Jalan",
    //                             'lat' => $point['lat'],
    //                             'lng' => $point['lng'],
    //                             'picture' => 'picture',
    //                             'description' => 'description'
    //                         ]);
    //                         if ($prevNodeId) {
    //                             $graph = Graph::create([
    //                                 'start' => $prevNodeId,
    //                                 'end' => $node->id, // Gunakan ID node yang baru saja dibuat
    //                                 'distance' => 0,
    //                             ]);
    //                         }

    //                         // Set ID node saat ini sebagai ID node sebelumnya untuk iterasi berikutnya
    //                         $prevNodeId = $node->id;
    //                     }
    //                 }
    //             }

    //             return response()->json(['message' => 'Nodes created successfully'], 200);
    //         }

    //         return response()->json(['error' => 'Failed to fetch or parse API response'], 500);
    //     } catch (\Exception $e) {
    //         return response()->json(['error' => $e->getMessage()], 500);
    //     }
    // }
    // public function generateNode()
    // {
    //     try {
    //         $response = Http::get("https://data.traffic.hereapi.com/v7/flow?in=circle:-6.9017724,107.5355892;r=2000&apiKey=I1UVxb4Tk7gzeKoX8OrmvwA140CnQmU4aDd-m5aAOpM&locationReferencing=shape");
    //         $data = $response->json();

    //         if ($response->successful() && isset($data['results'])) {
    //             $results = $data['results'];

    //             foreach ($results as $result) {
    //                 $location = $result['location'];
    //                 $name = isset($location['description']) ? $location['description'] : 'Unknown'; // Menangani kunci yang mungkin tidak ada

    //                 $shapeLinks = $location['shape']['links'];
    //                 $prevNodeId = null;

    //                 foreach ($shapeLinks as $index => $link) {
    //                     $points = $link['points'];
    //                     $pointsCount = count($points);

    //                     foreach ($points as $pointIndex => $point) {
    //                         $node = Node::create([
    //                             'name' => $name,
    //                             'type' => "Jalan",
    //                             'lat' => $point['lat'],
    //                             'lng' => $point['lng'],
    //                             'picture' => 'picture',
    //                             'description' => 'description'
    //                         ]);

    //                         if ($prevNodeId) {
    //                             $graph = Graph::create([
    //                                 'start' => $prevNodeId,
    //                                 'end' => $node->id,
    //                                 'distance' => 0,
    //                             ]);
    //                         }

    //                         // Set ID node saat ini sebagai ID node sebelumnya untuk iterasi berikutnya
    //                         $prevNodeId = $node->id;

    //                         // Jika ini adalah titik terakhir di link saat ini, atur titik ini sebagai titik awal untuk link berikutnya
    //                         if ($pointIndex === $pointsCount - 1 && isset($shapeLinks[$index + 1])) {
    //                             $nextLinkPoints = $shapeLinks[$index + 1]['points'];
    //                             $nextLinkStartPoint = reset($nextLinkPoints);

    //                             $nextNode = Node::create([
    //                                 'name' => $name,
    //                                 'type' => "Jalan",
    //                                 'lat' => $nextLinkStartPoint['lat'],
    //                                 'lng' => $nextLinkStartPoint['lng'],
    //                                 'picture' => 'picture',
    //                                 'description' => 'description'
    //                             ]);

    //                             // Buat edge (graph) antara node saat ini dan node berikutnya
    //                             $graph = Graph::create([
    //                                 'start' => $node->id,
    //                                 'end' => $nextNode->id,
    //                                 'distance' => 0,
    //                             ]);
    //                         }
    //                     }
    //                 }

    //                 return response()->json(['message' => 'Nodes created successfully'], 200);
    //             }

    //             return response()->json(['error' => 'Failed to fetch or parse API response'], 500);
    //         }
    //     } catch (\Exception $e) {
    //         return response()->json(['error' => $e->getMessage()], 500);
    //     }
    // }

    //start dan end
    // public function generateNode()
    // {
    //     try {
    //         $response = Http::get("https://data.traffic.hereapi.com/v7/flow?in=circle:-6.9018185492042,107.53609450658;r=1000&apiKey=I1UVxb4Tk7gzeKoX8OrmvwA140CnQmU4aDd-m5aAOpM&locationReferencing=shape");
    //         $data = $response->json();

    //         if ($response->successful() && isset($data['results'])) {
    //             $results = $data['results'];

    //             foreach ($results as $result) {
    //                 $location = $result['location'];
    //                 $name = isset($location['description']) ? $location['description'] : 'Unknown';

    //                 $shapeLinks = $location['shape']['links'];

    //                 $firstPoint = null;
    //                 $lastPoint = null;

    //                 foreach ($shapeLinks as $link) {
    //                     $points = $link['points'];

    //                     // Ambil hanya data pertama dan terakhir
    //                     $firstPoint = reset($points);
    //                     $lastPoint = end($points);

    //                     // Simpan node pertama jika belum ada
    //                     if (!$firstNode = Node::where(['lat' => $firstPoint['lat'], 'lng' => $firstPoint['lng']])->first()) {
    //                         $firstNode = Node::create([
    //                             'name' => $name,
    //                             'type' => "Jalan",
    //                             'lat' => $firstPoint['lat'],
    //                             'lng' => $firstPoint['lng'],
    //                             'picture' => 'picture',
    //                             'description' => 'description'
    //                         ]);
    //                     }

    //                     // Simpan node terakhir jika belum ada
    //                     if (!$lastNode = Node::where(['lat' => $lastPoint['lat'], 'lng' => $lastPoint['lng']])->first()) {
    //                         $lastNode = Node::create([
    //                             'name' => $name,
    //                             'type' => "Jalan",
    //                             'lat' => $lastPoint['lat'],
    //                             'lng' => $lastPoint['lng'],
    //                             'picture' => 'picture',
    //                             'description' => 'description'
    //                         ]);
    //                     }

    //                     // Simpan edge (graph)
    //                     Graph::create([
    //                         'start' => $firstNode->id,
    //                         'end' => $lastNode->id,
    //                         'distance' => $this->haversine($firstNode->lat, $firstNode->lng, $lastNode->lat, $lastNode->lng),
    //                     ]);
    //                 }
    //             }

    //             return response()->json(['message' => 'Nodes and Edges created successfully'], 200);
    //         }

    //         return response()->json(['error' => 'Failed to fetch or parse API response'], 500);
    //     } catch (\Exception $e) {
    //         return response()->json(['error' => $e->getMessage()], 500);
    //     }
    // }
    //semuanya
    // public function generateNode()
    // {
    //     try {
    //         $response = Http::get("https://data.traffic.hereapi.com/v7/flow?in=circle:-6.9018171475575,107.53609397738;r=2000&apiKey=I1UVxb4Tk7gzeKoX8OrmvwA140CnQmU4aDd-m5aAOpM&locationReferencing=shape");
    //         $data = $response->json();

    //         if ($response->successful() && isset($data['results'])) {
    //             $results = $data['results'];

    //             foreach ($results as $result) {
    //                 $location = $result['location'];
    //                 $name = isset($location['description']) ? $location['description'] : 'Unknown';

    //                 $shapeLinks = $location['shape']['links'];

    //                 // Tambahkan variabel untuk menyimpan ID node sebelumnya
    //                 $prevNodeId = null;

    //                 foreach ($shapeLinks as $link) {
    //                     $points = $link['points'];

    //                     foreach ($points as $point) {
    //                         // Simpan node ke database
    //                         $node = Node::create([
    //                             'name' => $name,
    //                             'type' => "Jalan",
    //                             'lat' => $point['lat'],
    //                             'lng' => $point['lng'],
    //                             'picture' => 'picture',
    //                             'description' => 'description'
    //                         ]);

    //                         // Tambahkan kondisi untuk menyimpan edge jika sudah ada node sebelumnya
    //                         if ($prevNodeId) {
    //                             $graph = Graph::create([
    //                                 'start_id' => $prevNodeId->id,
    //                                 'end_id' => $node->id, // Gunakan ID node yang baru saja dibuat
    //                                 'distance' => $this->haversine($node->lat, $node->lng, $prevNodeId->lat, $prevNodeId->lng),
    //                             ]);
    //                         }

    //                         // Set ID node saat ini sebagai ID node sebelumnya untuk iterasi berikutnya
    //                         $prevNodeId = $node;
    //                     }
    //                 }
    //             }

    //             return response()->json(['message' => 'Nodes and Edges created successfully'], 200);
    //         }

    //         return response()->json(['error' => 'Failed to fetch or parse API response'], 500);
    //     } catch (\Exception $e) {
    //         return response()->json(['error' => $e->getMessage()], 500);
    //     }
    // }
    // public function generateNode()
    // {
    //     try {
    //         $response = Http::get("https://data.traffic.hereapi.com/v7/flow?in=circle:-6.9018171475575,107.53609397738;r=1000&apiKey=I1UVxb4Tk7gzeKoX8OrmvwA140CnQmU4aDd-m5aAOpM&locationReferencing=shape");
    //         $data = $response->json();

    //         if ($response->successful() && isset($data['results'])) {
    //             $results = $data['results'];

    //             foreach ($results as $result) {
    //                 $location = $result['location'];
    //                 $name = isset($location['description']) ? $location['description'] : 'Unknown';

    //                 $shapeLinks = $location['shape']['links'];

    //                 // Tambahkan variabel untuk menyimpan ID node sebelumnya
    //                 $prevNodeId = null;

    //                 foreach ($shapeLinks as $link) {
    //                     $points = $link['points'];

    //                     foreach ($points as $point) {
    //                         // Pemeriksaan apakah Node dengan latitude dan longitude yang sama sudah ada
    //                         $existingNode = Node::where('lat', $point['lat'])->where('lng', $point['lng'])->first();

    //                         if (!$existingNode) {
    //                             // Simpan node ke database
    //                             $node = Node::create([
    //                                 'name' => $name,
    //                                 'type' => "Jalan",
    //                                 'lat' => $point['lat'],
    //                                 'lng' => $point['lng'],
    //                                 'picture' => 'picture',
    //                                 'description' => 'description'
    //                             ]);

    //                             // Tambahkan kondisi untuk menyimpan edge jika sudah ada node sebelumnya
    //                             if ($prevNodeId) {
    //                                 $graph = Graph::create([
    //                                     'start' => $prevNodeId->id,
    //                                     'end' => $node->id,
    //                                     'distance' => $this->haversine($node->lat, $node->lng, $prevNodeId->lat, $prevNodeId->lng),
    //                                 ]);
    //                             }

    //                             // Set ID node saat ini sebagai ID node sebelumnya untuk iterasi berikutnya
    //                             $prevNodeId = $node;
    //                         } else {
    //                             // Jika Node sudah ada, gunakan Node yang sudah ada sebagai prevNodeId
    //                             $prevNodeId = $existingNode;
    //                         }
    //                     }
    //                 }
    //             }

    //             return response()->json(['message' => 'Nodes and Edges created successfully'], 200);
    //         }

    //         return response()->json(['error' => 'Failed to fetch or parse API response'], 500);
    //     } catch (\Exception $e) {
    //         return response()->json(['error' => $e->getMessage()], 500);
    //     }
    // }
    public function generateNode()
    {
        try {
            $response = Http::get("https://data.traffic.hereapi.com/v7/flow?in=circle:-6.889575748798919,107.53497215190754;r=300&apiKey=I1UVxb4Tk7gzeKoX8OrmvwA140CnQmU4aDd-m5aAOpM&locationReferencing=shape");
            $data = $response->json();

            if ($response->successful() && isset($data['results'])) {
                $results = $data['results'];

                foreach ($results as $result) {
                    $location = $result['location'];
                    $name = isset($location['description']) ? $location['description'] : 'Unknown';

                    $shapeLinks = $location['shape']['links'];

                    // Tambahkan variabel untuk menyimpan ID node sebelumnya
                    $prevNodeId = null;

                    foreach ($shapeLinks as $link) {
                        $points = $link['points'];

                        foreach ($points as $point) {
                            // Pemeriksaan apakah Node dengan latitude dan longitude yang sama sudah ada
                            $existingNode = Node::where('lat', $point['lat'])->where('lng', $point['lng'])->first();

                            if (!$existingNode && $name !== "Kabupaten Bandung 1") {
                                // Simpan node ke database
                                $node = Node::create([
                                    'name' => $name,
                                    'type' => "Jalan",
                                    'lat' => $point['lat'],
                                    'lng' => $point['lng'],
                                    'picture' => 'picture',
                                    'description' => 'description'
                                ]);

                                // Tambahkan kondisi untuk menyimpan edge jika sudah ada node sebelumnya
                                if ($prevNodeId) {
                                    $graph = Graph::create([
                                        'start' => $prevNodeId->id,
                                        'end' => $node->id,
                                        'distance' => $this->haversine($node->lat, $node->lng, $prevNodeId->lat, $prevNodeId->lng),
                                    ]);
                                }

                                // Set ID node saat ini sebagai ID node sebelumnya untuk iterasi berikutnya
                                $prevNodeId = $node;
                            } else {
                                // Jika Node sudah ada, gunakan Node yang sudah ada sebagai prevNodeId
                                $prevNodeId = $existingNode;
                            }
                        }
                    }
                }

                return response()->json(['message' => 'Nodes and Edges created successfully'], 200);
            }

            return response()->json(['error' => 'Failed to fetch or parse API response'], 500);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
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
    function Testing(){
        $unconnectedNodes = Node::whereDoesntHave('outgoingEdges')
        ->orWhereDoesntHave('incomingEdges')
        ->get();
        return response()->json($this->haversine(-6.894869181908263, 107.53662110548726, -6.89487, 107.53659), 200);
    }
}
