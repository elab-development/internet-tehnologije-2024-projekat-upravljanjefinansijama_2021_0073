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
            "category"=> ['required', 'in:in:Hrana,Stanovanje,Odeca,Kuca,Putovanja'],
            "description"=> ['required',''],
            'date' => [
                'required',
                'date',
                'after_or_equal:2025-01-01', 
                'before_or_equal:2025-07-18' 
                ],
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        /*
        $totalIncome = $budget->incomes->sum('amount');*/

        // provera da li novi income prelazi budget limit
        /*
        if (($totalIncome + $request->amount) > $budget->limit) {
            return response()->json([
                'message' => 'Income exceeds the budget limit.'
            ], 400);
        }*/

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
            "category"=> ['required', 'in:in:Hrana,Stanovanje,Odeca,Kuca,Putovanja'],
            "description"=> ['required',''],
            'date' => [
                'required',
                'date',
                'after_or_equal:2025-01-01', 
                'before_or_equal:2025-07-18' 
                ],
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        /*
        $totalIncome = $budget->incomes->sum('amount');*/

        // provera da li novi income prelazi budget limit
        /*
        if (($totalIncome + $request->amount) > $budget->limit) {
            return response()->json([
                'message' => 'Income exceeds the budget limit.'
            ], 400);
        }*/

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
}
