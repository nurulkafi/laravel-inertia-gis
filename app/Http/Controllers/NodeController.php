<?php

namespace App\Http\Controllers;

use App\Models\Node;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
class NodeController extends Controller
{
    //
    public function index(Request $request): Response
    {

        return Inertia::render('Node/Index', [
            'datas' => Node::latest()->paginate(10),
            'map_token' => env("MAP_BOX_API_KEY"),
            'node' => Node::get(),
            // 'status' => session('status'),
        ]);
        // dd();

    }
    public function create(Request $request)
    {
        // dd($request->all());
        try {
            if ($request->has('address')) {
                $save = Node::create([
                    'name' => $request->address,
                    'type' => "Tujuan",
                    'lat' => $request->lat,
                    'lng' => $request->lng,
                    'picture' => 'picture',
                    'description' => $request->nameOfPelapor." - ".$request->tujuan,
                ]);
            }else{
                $save = Node::create([
                    'name' => $request->name,
                    'type' => "Jalan",
                    'lat' => $request->lat,
                    'lng' => $request->lng,
                    'picture' => 'picture',
                    'description' => 'description'
                ]);
            }
            // sleep(1);

            // return redirect()->route('node.index')->with('message', 'Blog Created Successfully');
            // return Redirect::route('node.index')->with('message', 'Data Berhasil Disimpan!');
            return back()->with([
                'type' => 'success',
                'message' => 'Node Berhasil Ditambahkan!',
            ]);
        } catch (\Throwable $th) {
            //throw $th;
            return back()->with([
                'type' => 'error',
                'message' => 'Terdapat Kesalahan Coba Lagi!',
            ]);
        }
    }
}
