<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Barryvdh\DomPDF\Facade\Pdf;

class ExportController extends Controller {
    public function expensesCsv(Request $req): StreamedResponse {
        $userId = $req->user()->id;
        $budgetId = (int)$req->query('budget_id');
        $from = $req->query('from'); 
        $to   = $req->query('to');

        return response()->streamDownload(function () use ($userId, $budgetId, $from, $to) {
            $out = fopen('php://output', 'w');
            fputcsv($out, ['date','category','amount','description','budget']);

            $q = DB::table('expenses')
                ->join('budgets','budgets.id','=','expenses.budget_id')
                ->where('budgets.user_id', $userId)
                ->when($budgetId, fn($qq) => $qq->where('budgets.id', $budgetId))
                ->when($from && $to, fn($qq) => $qq->whereBetween('expenses.date', [$from, $to]))
                ->select('expenses.date','expenses.category','expenses.amount','expenses.description','budgets.category as budget_name')
                ->orderBy('expenses.date','asc');

            $q->chunk(500, function($rows) use ($out){
                foreach ($rows as $r) {
                    fputcsv($out, [$r->date, $r->category, $r->amount, $r->description, $r->budget_name]);
                }
            });

            fclose($out);
        }, 'expenses.csv', ['Content-Type' => 'text/csv']);
    }

    public function reportPdf(Request $req) {
        $user = $req->user();
        $from = $req->query('from'); 
        $to   = $req->query('to');

        if (!$from || !$to) { 
            $to   = now()->toDateString(); 
            $from = now()->subMonth()->toDateString(); 
        }

        // Reuse ReportController logike (bolje izdvojiti u servis)
        $summary = app(\App\Http\Controllers\ReportController::class)->summary(new Request([
            'from' => $from,
            'to'   => $to
        ] + ['user' => $user]));

        $data = $summary->getData(true);
        $pdf = Pdf::loadView('report', $data);
        return $pdf->download("report_{$from}_{$to}.pdf");
    }
}
