<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
class LandingPageController extends Controller
{
    //
    public function index(){
        return Inertia::render('LandingPage/Index');
    }
    public function laporkan()
    {
        return Inertia::render('LandingPage/Laporkan',[
            'map_token' => env("MAP_BOX_API_KEY")
        ]);
    }
}
