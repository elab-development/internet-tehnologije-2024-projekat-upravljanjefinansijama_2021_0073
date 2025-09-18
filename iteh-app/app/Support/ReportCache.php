<?php
namespace App\Support;

use Illuminate\Support\Facades\Cache;

class ReportCache {
    public static function clearForUser(int $userId): void {
        $ranges = [
            [now()->subMonths(5)->startOfMonth()->toDateString(), now()->endOfMonth()->toDateString()],
            [now()->subYear()->startOfYear()->toDateString(), now()->endOfYear()->toDateString()],
        ];
        foreach ($ranges as [$from,$to]) {
            $key = "rep:{$userId}:$from:$to";
            Cache::forget($key);
        }
    }
}
