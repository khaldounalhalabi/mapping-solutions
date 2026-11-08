<?php

namespace App\Modules\Sitemap;

use Throwable;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;

class GenerateSitemapCommand extends Command
{
    protected $description = 'Generate and atomically publish localized public sitemaps';

    protected $signature = 'sitemap:generate';

    public function handle(SitemapGenerator $generator): int
    {
        $lock = Cache::lock('sitemap:generate', 86400);

        if (! $lock->get()) {
            $this->error('A sitemap generation is already running.');

            return self::FAILURE;
        }

        try {
            $count = $generator->generate();
            $this->info("Published sitemap.xml with {$count} localized URLs.");

            return self::SUCCESS;
        } catch (Throwable $exception) {
            report($exception);
            $this->error($exception->getMessage());

            return self::FAILURE;
        } finally {
            $lock->release();
        }
    }
}
