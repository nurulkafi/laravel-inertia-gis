<?php

namespace Database\Seeders;

use App\Models\Node;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NodeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       Node::create([
            'name' => "Kantor Pemadam Kebakaran",
            'type' => "Kantor",
            'lat' => "-6.9018171475575",
            'lng' => "107.53609397738",
            'picture' => 'picture',
            'description' => 'description'
        ]);
        
    }
}
