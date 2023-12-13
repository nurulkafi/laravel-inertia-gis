<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('graphs', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('start');
            $table->bigInteger('end');
            $table->string('distance');
            $table->string('time')->nullable();
            $table->index(['start','end']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('graphs');
    }
};
