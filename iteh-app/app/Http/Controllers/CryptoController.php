<?php
namespace App\Http\Controllers;

use App\Services\CryptoService;
use App\Services\ExchangeService;
use Illuminate\Http\Request;

class CryptoController extends Controller {
    public function prices(Request $req, CryptoService $cg, ExchangeService $fx) {
        $ids = array_filter(explode(',', $req->query('ids','bitcoin,ethereum')));
        $fiat = strtoupper($req->query('fiat','USD'));
        try {
            $data = $cg->simplePrice($ids, $fiat);
            // Primer: konverzija u RSD ako tražiš ?display=RSD
            $display = strtoupper($req->query('display', $fiat));
            $rate = 1.0;
            if ($display !== $fiat) $rate = $fx->getRate($fiat, $display);

            $out = [];
            foreach ($data as $id => $obj) {
                $price = (float)($obj[strtolower($fiat)] ?? 0);
                $out[] = [
                    'id' => $id,
                    'price' => $price,
                    'currency' => $fiat,
                    'display_price' => round($price * $rate, 2),
                    'display_currency' => $display
                ];
            }
            return response()->json(['prices' => $out]);
        } catch (\Throwable $e) {
            return response()->json(['message'=>'Crypto unavailable','details'=>$e->getMessage()], 503);
        }
    }
}
