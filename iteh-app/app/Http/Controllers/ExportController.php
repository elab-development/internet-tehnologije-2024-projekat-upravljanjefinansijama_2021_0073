<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ExportController extends Controller {
    public function expensesCsv(Request $req) : StreamedResponse {
        $budgetId = (int)$req->query('budget_id');

        // Sledeći korak: SELECT + fputcsv u StreamedResponse
        return response()->streamDownload(function () {
            $out = fopen('php://output', 'w');
            fputcsv($out, ['date','category','amount','description']);
            // foreach ($rows as $r) fputcsv($out, [$r->date, $r->category, $r->amount, $r->description]);
            fclose($out);
        }, 'expenses.csv', ['Content-Type' => 'text/csv']);
    }

    public function reportPdf(Request $req) {
        // Sledeći korak: generisanje PDF-a (dompdf/snappy) iz views/report.blade.php
        return response()->json(['message'=>'PDF coming soon']);
    }
}
