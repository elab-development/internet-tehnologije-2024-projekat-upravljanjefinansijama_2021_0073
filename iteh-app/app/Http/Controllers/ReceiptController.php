<?php
namespace App\Http\Controllers;

use App\Models\Expense;
use App\Models\Receipt;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ReceiptController extends Controller {
    public function index($expenseId) {
        $expense = Expense::findOrFail($expenseId);
        $this->authorize('view', $expense->budget); // ili Policy za Expense
        return response()->json(['receipts' => $expense->receipts()->latest()->get()]);
    }

    public function store(Request $req, $expenseId) {
        $expense = Expense::findOrFail($expenseId);
        $this->authorize('update', $expense->budget);

        $req->validate(['file' => 'required|file|max:4096|mimes:png,jpg,jpeg,pdf']);
        $path = $req->file('file')->store('receipts', 'public');

        $receipt = $expense->receipts()->create([
            'path' => $path,
            'mime' => $req->file('file')->getMimeType(),
            'size' => $req->file('file')->getSize(),
        ]);

        return response()->json(['receipt' => $receipt], 201);
    }

    public function destroy($id) {
        $receipt = Receipt::findOrFail($id);
        $this->authorize('update', $receipt->expense->budget);
        Storage::disk('public')->delete($receipt->path);
        $receipt->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
