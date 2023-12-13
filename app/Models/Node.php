<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Node extends Model
{
    use HasFactory;
    /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = [];
    public function outgoingEdges()
    {
        return $this->hasMany(Graph::class, 'start');
    }

    public function incomingEdges()
    {
        return $this->hasMany(Graph::class, 'end');
    }
    public function graphs()
    {
        return $this->hasMany(Graph::class, 'start');
    }
    
}
