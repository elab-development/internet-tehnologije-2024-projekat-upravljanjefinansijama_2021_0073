<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;

class ReportController extends Controller {
    public function summary(Request $req) {
        $user = $req->user();
        $from = $req->query('from'); // npr. 2025-01-01
        $to   = $req->query('to');   // npr. 2025-12-31

        if (!$from || !$to) {
            // Ako nema parametara: poslednjih 6 meseci
            $to = now()->endOfMonth()->toDateString();
            $from = now()->subMonths(5)->startOfMonth()->toDateString();
        }

        $cacheKey = "rep:{$user->id}:$from:$to";

        return Cache::remember($cacheKey, now()->addMinutes(30), function () use ($user, $from, $to) {
            // -------- INCOME PO MESECIMA --------
            $incomes = DB::table('incomes')
                ->join('budgets', 'budgets.id', '=', 'incomes.budget_id')
                ->where('budgets.user_id', $user->id)
                ->whereBetween('incomes.date', [$from, $to])
                ->selectRaw("DATE_FORMAT(incomes.date, '%Y-%m') as ym, SUM(incomes.amount) as income")
                ->groupBy('ym')
                ->pluck('income', 'ym');

            // -------- EXPENSES PO MESECIMA --------
            $expenses = DB::table('expenses')
                ->join('budgets', 'budgets.id', '=', 'expenses.budget_id')
                ->where('budgets.user_id', $user->id)
                ->whereBetween('expenses.date', [$from, $to])
                ->selectRaw("DATE_FORMAT(expenses.date, '%Y-%m') as ym, SUM(expenses.amount) as expense")
                ->groupBy('ym')
                ->pluck('expense', 'ym');

            // -------- SPOJENO IZRACUNATO --------
            $months = collect($incomes->keys())->merge($expenses->keys())->unique()->sort()->values();

            $byMonth = $months->map(function ($m) use ($incomes, $expenses) {
                $inc = (float)($incomes[$m] ?? 0);
                $exp = (float)($expenses[$m] ?? 0);
                return [
                    'month' => $m,
                    'income' => $inc,
                    'expense' => $exp,
                    'net' => round($inc - $exp, 2)
                ];
            })->values();

            // -------- PO KATEGORIJAMA --------
            $byCategory = DB::table('expenses')
                ->join('budgets', 'budgets.id', '=', 'expenses.budget_id')
                ->where('budgets.user_id', $user->id)
                ->whereBetween('expenses.date', [$from, $to])
                ->selectRaw("COALESCE(expenses.category,'Uncategorized') as category, SUM(expenses.amount) as sum")
                ->groupBy('category')
                ->orderByDesc('sum')
                ->limit(15)
                ->get()
                ->map(fn ($r) => ['category' => $r->category, 'sum' => (float)$r->sum]);

            // -------- REZULTAT --------
            return [
                'range' => compact('from', 'to'),
                'by_month' => $byMonth,
                'by_category' => $byCategory,
            ];
        });
    }
}
