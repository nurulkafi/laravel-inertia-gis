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
        Schema::table('nodes', function (Blueprint $table) {
            $table->string('tingkatKemacetan')->default(0)->nullable();
            $table->integer('tipeJalan')->default(1)->nullable();
            $table->dateTime('lastUpdate')->nullable();

            $table->index(['lastUpdate']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('graphs', function (Blueprint $table) {
            $table->dropColumn('tingkatKemacetan');
            $table->dropColumn('tipeJalan');
            $table->dropColumn('lastUpdate');
        });
    }
};
