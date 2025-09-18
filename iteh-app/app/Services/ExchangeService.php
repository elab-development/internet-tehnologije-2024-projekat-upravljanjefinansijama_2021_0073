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
                $base = rtrim(env('FX_BASE', 'https://open.er-api.com/v6'), '/');

                $resp = Http::timeout(10)
                    ->withOptions(['verify' => false])
                    ->get("$base/latest/$from");

                if ($resp->failed() || !isset($resp['rates'][$to])) {
                    throw new \RuntimeException("FX rate not available");
                }

                return (float) $resp['rates'][$to];
            }
        );
    }
}
