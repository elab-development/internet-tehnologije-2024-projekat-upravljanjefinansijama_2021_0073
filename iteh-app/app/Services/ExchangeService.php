<?php
namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class ExchangeService {
    public function getRate(string $from, string $to): float {
        $from = strtoupper($from); 
        $to   = strtoupper($to);
        if ($from === $to) return 1.0;

        $key = "fx_rate_{$from}_{$to}";

        return Cache::remember(
            $key,
            now()->addSeconds((int)env('FX_CACHE_TTL', 86400)),
            function () use ($from, $to) {
                $base = rtrim(env('FX_BASE', 'https://api.exchangerate.host'), '/');
                $resp = Http::timeout(10)
                    ->withOptions(['verify' => false]) // privremeno isključen ssl
                    ->get("$base/latest", ['base' => $from, 'symbols' => $to]);

                if ($resp->failed() || !isset($resp['rates'][$to])) {
                    throw new \RuntimeException("FX rate not available");
                }

                return (float) $resp['rates'][$to];
            }
        );
    }
}
