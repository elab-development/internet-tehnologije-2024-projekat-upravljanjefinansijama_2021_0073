<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller {
    public function summary(Request $req) {
        $user = $req->user();
        $from = $req->query('from'); // YYYY-MM-01
        $to   = $req->query('to');   // YYYY-MM-31

        // Kostur upita: poenčićemo sledećim korakom (JOIN budgets,incomes,expenses + GROUP BY)
        // $data = ...

        return response()->json([
            'range' => compact('from','to'),
            'by_month' => [],     // [{month:'2025-08', income:..., expense:..., net:...}]
            'by_category' => [],  // [{category:'Hrana', sum:...}, ...]
        ]);
    }
}
