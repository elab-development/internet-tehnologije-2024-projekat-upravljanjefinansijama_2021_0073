<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class ExchangeController extends Controller {
    public function convert(Request $req) {
        $from = strtoupper($req->query('from','RSD'));
        $to   = strtoupper($req->query('to','EUR'));
        $amt  = (float)$req->query('amount', 0);

        // Sledeći korak: poziv javnog API-ja + Cache::remember('fx_'.$from.'_'.$to, 86400, fn()=>...)
        $rate = 0.0; // stub

        return response()->json([
            'from' => $from, 'to' => $to, 'amount' => $amt,
            'rate' => $rate, 'converted' => $amt * $rate
        ]);
    }
}
