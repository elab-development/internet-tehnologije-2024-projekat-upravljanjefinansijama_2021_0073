<?php
namespace App\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;

class ReportService {
    public function summary($userId, $from, $to) {
        $cacheKey = "rep:{$userId}:$from:$to";

        return Cache::remember($cacheKey, now()->addMinutes(30), function () use ($userId, $from, $to) {
            $incomes = DB::table('incomes')
                ->join('budgets', 'budgets.id', '=', 'incomes.budget_id')
                ->where('budgets.user_id', $userId)
                ->whereBetween('incomes.date', [$from, $to])
                ->selectRaw("DATE_FORMAT(incomes.date, '%Y-%m') as ym, SUM(incomes.amount) as income")
                ->groupBy('ym')
                ->pluck('income', 'ym');

            $expenses = DB::table('expenses')
                ->join('budgets', 'budgets.id', '=', 'expenses.budget_id')
                ->where('budgets.user_id', $userId)
                ->whereBetween('expenses.date', [$from, $to])
                ->selectRaw("DATE_FORMAT(expenses.date, '%Y-%m') as ym, SUM(expenses.amount) as expense")
                ->groupBy('ym')
                ->pluck('expense', 'ym');

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

            $byCategory = DB::table('expenses')
                ->join('budgets', 'budgets.id', '=', 'expenses.budget_id')
                ->where('budgets.user_id', $userId)
                ->whereBetween('expenses.date', [$from, $to])
                ->selectRaw("COALESCE(expenses.category,'Uncategorized') as category, SUM(expenses.amount) as sum")
                ->groupBy('category')
                ->orderByDesc('sum')
                ->limit(15)
                ->get()
                ->map(fn ($r) => ['category' => $r->category, 'sum' => (float)$r->sum]);

            return [
                'range' => compact('from', 'to'),
                'by_month' => $byMonth,
                'by_category' => $byCategory,
            ];
        });
    }
}
