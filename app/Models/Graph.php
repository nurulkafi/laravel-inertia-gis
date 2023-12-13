<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Graph extends Model
{
    use HasFactory;
    /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = [];
    public function startCoordinate()
    {
        return $this->belongsTo(Node::class, 'start');
    }

    public function endCoordinate()
    {
        return $this->belongsTo(Node::class, 'end');
    }
}
