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
            ->select('graphs.*','startNode.name as nameStart', 'startNode.lat as latStart', 'startNode.lng as lngStart', 'endNode.name as nameEnd', 'endNode.lat as latEnd', 'endNode.lng as lngEnd')
            ->latest()->paginate(10);
        return Inertia::render('Graph/Index', [
            'node' => Node::get(),
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
}
