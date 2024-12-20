<?php

namespace App\Http\Controllers;

use App\Http\Resources\ExpenseCollection;
use App\Http\Resources\ExpenseResource;
use App\Models\Budget;
use App\Models\Expense;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Budget $budget)
    {
        $expenses = $budget->expenses;
        return new ExpenseCollection($expenses);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Budget $budget)
    {
        $validator = Validator::make($request->all(), [
            "amount"=> ['required', 'numeric', 'min:10', 'max:10000'],
            "category"=> ['required', 'in:Hrana,Stanovanje,Ostalo,Kuca,Putovanja'],
            "description"=> ['required',''],
            'date' => [
                'required',
                'date',
                function ($attribute, $value, $fail) use ($budget) {
                    if ($value < $budget->start_date || $value > $budget->end_date) {
                        $fail("The $attribute must be between the budget's start_date ({$budget->start_date}) and end_date ({$budget->end_date}).");
                    }
                }
            ]
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $total_expenses = $budget->expenses->sum("amount");

        if ($request->amount + $total_expenses > $budget->limit) {
            return response()->json([
                'message' => 'Cannot add expense as it exceeds the budget limit.',
                'remaining_budget' => ($budget->limit - $total_expenses),
            ], 400);
        }

        $expense = new Expense;
        $expense->amount = $request->amount;
        $expense->category = $request->category;
        $expense->description = $request->description;
        $expense->date = $request->date;
        $expense->budget_id = $budget->id;
        $expense->save();

        return response()->json(['Expense created successfully', new ExpenseResource($expense)]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Expense  $expense
     * @return \Illuminate\Http\Response
     */
    public function show(Expense $expense)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Expense  $expense
     * @return \Illuminate\Http\Response
     */
    public function edit(Expense $expense)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Expense  $expense
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Budget $budget, Expense $expense)
    {
        $validator = Validator::make($request->all(), [
            "amount"=> ['required', 'numeric', 'min:10', 'max:10000'],
            "category"=> ['required', 'in:Hrana,Stanovanje,Ostalo,Kuca,Putovanja'],
            "description"=> ['required',''],
            'date' => [
                'required',
                'date',
                function ($attribute, $value, $fail) use ($budget) {
                    if ($value < $budget->start_date || $value > $budget->end_date) {
                        $fail("The $attribute must be between the budget's start_date ({$budget->start_date}) and end_date ({$budget->end_date}).");
                    }
                }
            ],
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $expense->amount = $request->amount;
        $expense->category = $request->category;
        $expense->description = $request->description;
        $expense->date = $request->date;

        $expense->save();

        return response()->json(['Expense updated successfully', new ExpenseResource($expense)]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Expense  $expense
     * @return \Illuminate\Http\Response
     */
    public function destroy(Budget $budget, Expense $expense)
    {
        $expense->delete();
        return response()->json('Expense successfully deleted');
    }

    public function indexFilter(Request $request) {
        $user = auth()->user();
        $userBudgetIds = $user->budgets->pluck('id')->toArray();

        $query = Expense::query();

        $query->whereIn('budget_id', $userBudgetIds);

        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        if ($request->has('min_amount') && $request->has('max_amount')) {
            $query->whereBetween('amount', [$request->min_amount, $request->max_amount]);
        }

        if ($request->has('start_date') && $request->has('end_date')) {
            $query->whereBetween('date', [$request->start_date, $request->end_date]);
        }

        $expenses = $query->paginate(20);

        return response()->json($expenses);
    }
}
