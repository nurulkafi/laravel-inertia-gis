<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class UpdateGraphs extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:update-graphs';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Graph Update to be executed every 5 minutes';


    /**
     * Execute the console command.
     */
    public function handle()
    {
        //
        $this->info('Task executed successfully!');
    }
}
