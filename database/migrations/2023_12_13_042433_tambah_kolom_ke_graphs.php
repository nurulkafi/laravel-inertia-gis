<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('graphs', function (Blueprint $table) {
            $table->integer('tingkatKemacetan')->default(0)->nullable();
            $table->integer('bobot')->default(0)->nullable();
            $table->dateTime('lastUpdate')->nullable();
        });
    }

    public function down()
    {
        Schema::table('graphs', function (Blueprint $table) {
            $table->dropColumn('tingkatKemacetan');
            $table->dropColumn('bobot');
            $table->dropColumn('lastUpdate');
        });
    }

};
