<?php

namespace App\Http\Controllers;

use App\Models\Graph;
use App\Models\Node;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GraphController extends Controller
{
    //
    public function index(Request $request): Response
    {

        $graph = Graph::join('nodes as startNode', 'start', '=', 'startNode.id')
            ->join('nodes as endNode', 'end', '=', 'endNode.id')
            ->select('graphs.*', 'startNode.name as nameStart', 'startNode.lat as latStart', 'startNode.lng as lngStart', 'endNode.name as nameEnd', 'endNode.lat as latEnd', 'endNode.lng as lngEnd')
            ->latest()->paginate(10);
        return Inertia::render('Graph/Index', [
            'node' => Node::orderBy('id')->get(),
            'graph' => $graph,
            'map_token' => env("MAP_BOX_API_KEY")
            // 'status' => session('status'),
        ]);
        // dd($graph);
    }
    public function create(Request $request)
    {
        // dd($request->all());
        try {
            $save = Graph::create([
                'start' => $request->start,
                'end' => $request->end,
                'distance' => $request->distance,
            ]);
            // sleep(1);

            // return redirect()->route('node.index')->with('message', 'Blog Created Successfully');
            // return Redirect::route('node.index')->with('message', 'Data Berhasil Disimpan!');
            return back()->with([
                'type' => 'success',
                'message' => 'Graph Berhasil Ditambahkan!',
            ]);
        } catch (\Throwable $th) {
            //throw $th;
            return back()->with([
                'type' => 'error',
                'message' => $th->getMessage(),
            ]);
        }
    }
    public function add(Request $request): Response
    {
        $unconnectedNodes = Node::whereDoesntHave('outgoingEdges')
            ->orWhereDoesntHave('incomingEdges')
            ->get();
        return Inertia::render('Graph/Partials/form', [
            'node' => Node::get(),
            'unconnectedNodes' => $unconnectedNodes,
            'map_token' => env("MAP_BOX_API_KEY")
            // 'status' => session('status'),
        ]);
        // dd($graph);
    }
    public function update(Request $request,$id)
    {
        // dd($request->all());
        try {
            if (is_numeric($request->start)) {
                $start = $request->start;
                $deskripsi = ''; // Atur deskripsi ke string kosong jika hanya berisi start
            } else {
                list($start, $deskripsi) = explode(' - ', $request->start, 2);

                // Hapus spasi ekstra di awal dan akhir deskripsi
                $deskripsi = trim($deskripsi);
            }
            if (is_numeric($request->end)) {
                $end = $request->end;
                $deskripsi = ''; // Atur deskripsi ke string kosong jika hanya berisi end
            } else {
                list($end, $deskripsi) = explode(' - ', $request->end, 2);

                // Hapus spasi ekstra di awal dan akhir deskripsi
                $deskripsi = trim($deskripsi);
            }

            $data = Graph::where('id',$id)->first();
            $data->update([
                'start' => $start,
                'end' => $end,
                'distance' => $request->distance,
            ]);
            // sleep(1);

            // return redirect()->route('node.index')->with('message', 'Blog Created Successfully');
            // return Redirect::route('node.index')->with('message', 'Data Berhasil Disimpan!');
            return back()->with([
                'type' => 'success',
                'message' => 'Graph Berhasil Diubah!',
            ]);
        } catch (\Throwable $th) {
            //throw $th;
            return back()->with([
                'type' => 'error',
                'message' => $th->getMessage(),
            ]);
        }
    }
    public function show($id)
    {
        $data = Graph::where('graphs.id',$id)->join('nodes as startNode', 'start', '=', 'startNode.id')
        ->join('nodes as endNode', 'end', '=', 'endNode.id')
        ->select('graphs.*', 'startNode.name as nameStart', 'startNode.lat as latStart', 'startNode.lng as lngStart', 'endNode.name as nameEnd', 'endNode.lat as latEnd', 'endNode.lng as lngEnd')
        ->first(); // Add the get() method to execute the query and fetch the data

        return response()->json($data);
    }
    public function delete(Request $request, $id)
    {
        try {
            $data = Graph::where('id', $id)->first();
            $data->delete();

            return back()->with([
                'type' => 'success',
                'message' => 'Graph Berhasil Dihapus!',
            ]);
        } catch (\Throwable $th) {
            //throw $th;
            return back()->with([
                'type' => 'error',
                'message' => $th->getMessage(),
            ]);
        }
    }
}
