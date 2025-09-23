<?php

namespace App\Http\Controllers;

use App\Http\Resources\BudgetCollection;
use App\Http\Resources\BudgetResource;
use App\Models\Budget;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Support\ReportCache;

class BudgetController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // ulogovani korisnik moze samo svoje budzete videti
        $user = auth()->user();
        $budgets = Budget::where("user_id", $user->id)->get();
        return new BudgetCollection($budgets);
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
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'category' => ['required', 'in:Hrana,Stanovanje,Ostalo,Kuca,Putovanja'],
            'limit' => ['required', 'numeric', 'min:10', 'max:10000'],
            'start_date' => ['required', 'date', 'before:end_date'],
            'end_date' => ['required', 'date', 'after:start_date'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422); 
        }

        $budget = new Budget;
        $budget->category = $request->category;
        $budget->limit = $request->limit;
        $budget->start_date = $request->start_date;
        $budget->end_date = $request->end_date;
        $budget->user_id = auth()->id();


        $budget->save();
        ReportCache::clearForUser($request->user()->id);

        return response()->json(['Budget created successfully', new BudgetResource($budget)]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Budget  $budget
     * @return \Illuminate\Http\Response
     */
    public function show(Budget $budget)
    {
        $this->authorize('view', $budget);
        return new BudgetResource($budget);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Budget  $budget
     * @return \Illuminate\Http\Response
     */
    public function edit(Budget $budget)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Budget  $budget
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Budget $budget)
    {
        $this->authorize('update', $budget);

        $validator = Validator::make($request->all(), [
            'category' => ['required', 'in:Hrana,Stanovanje,Ostalo,Kuca,Putovanja'],
            'limit' => ['required', 'numeric', 'min:10', 'max:10000'],
            'start_date' => ['required', 'date', 'before:end_date'],
            'end_date' => ['required', 'date', 'after:start_date'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422); 
        }

        $budget->category = $request->category;
        $budget->limit = $request->limit;
        $budget->start_date = $request->start_date;
        $budget->end_date = $request->end_date;

        $budget->save();

        ReportCache::clearForUser($request->user()->id);

        return response()->json(['Budget updated successfully', new BudgetResource($budget)]);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Budget  $budget
     * @return \Illuminate\Http\Response
     */
    public function destroy(Budget $budget)
    {
        $this->authorize('delete', $budget);
        $budget->delete();
        ReportCache::clearForUser(auth()->user()->id);

        return response()->json('Budget successfully deleted');
    }

    public function calculateSavings() {
        $user = auth()->user();
        $savings = 0;
        foreach ($user->budgets as $budget) {
            $total_incomes = $budget->incomes->sum('amount') ?? 0;
            $total_expenses = $budget->expenses->sum('amount') ?? 0;

            $savings += $total_incomes - $total_expenses;
        }

        return response()->json(['savings'=>$savings], 200);
    }

    public function getMaxExpenseCategory() {
        $user = auth()->user();

        $categories = []; 

        foreach ($user->budgets as $budget) {
            foreach ($budget->expenses as $expense) {
                // ako kategorija vec postoji u nizu, saberi iznos
                if (isset($categories[$expense->category])) {
                    $categories[$expense->category] += $expense->amount;
                } else {
                    $categories[$expense->category] = $expense->amount;
                }
            }
        }

        if (empty($categories)) {
            return response()->json(['message' => 'No expenses found.'], 200);
        }

        $maxCategory = array_keys($categories, max($categories))[0];
        $maxAmount = $categories[$maxCategory];

        return response()->json([
            'category' => $maxCategory,
            'amount' => $maxAmount
        ], 200);

    }
}
