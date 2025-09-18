<?php
namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class CryptoService {
    public function simplePrice(array $ids, string $vs): array {
        sort($ids); $key = 'cg_price_'.implode('_',$ids).'_'.strtoupper($vs);
        return Cache::remember($key, now()->addSeconds((int)env('CRYPTO_CACHE_TTL',300)), function () use ($ids,$vs) {
            $base = rtrim(env('CRYPTO_BASE','https://api.coingecko.com/api/v3'),'/');
            $resp = Http::timeout(10)
                ->withOptions(['verify' => false]) 
                ->get("$base/simple/price", [
                    'ids' => implode(',', $ids),
                    'vs_currencies' => strtolower($vs),
                ]);
            if ($resp->failed()) throw new \RuntimeException("Crypto price unavailable");
            return $resp->json();
        });
    }
}
