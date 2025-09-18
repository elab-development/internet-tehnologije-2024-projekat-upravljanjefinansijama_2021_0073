<?php
namespace App\Http\Controllers;

use App\Services\ExchangeService;
use Illuminate\Http\Request;

class ExchangeController extends Controller {
    public function convert(Request $req, ExchangeService $fx) {
        $from = strtoupper($req->query('from','RSD'));
        $to   = strtoupper($req->query('to','EUR'));
        $amt  = (float)$req->query('amount', 0);
        try {
            $rate = $fx->getRate($from, $to);
            return response()->json([
                'from'      => $from,
                'to'        => $to,
                'amount'    => $amt,
                'rate'      => $rate,
                'converted' => round($amt * $rate, 2)
            ]);
        } catch (\Throwable $e) {
            return response()->json(['message'=>'FX unavailable','details'=>$e->getMessage()], 503);
        }
    }
}
