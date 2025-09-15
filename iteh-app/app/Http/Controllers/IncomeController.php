<?php

namespace App\Http\Controllers;

use App\Http\Resources\IncomeCollection;
use App\Http\Resources\IncomeResource;
use App\Models\Budget;
use App\Models\Income;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class IncomeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Budget $budget)
    {
        $incomes = $budget->incomes;
        return new IncomeCollection($incomes);
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
            "source"=> ['required', 'in:Plata,Bonus,Investicije,Od roditelja,Freelance'],
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
            return response()->json($validator->errors(), 422);
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

        $income = new Income;
        $income->amount = $request->amount;
        $income->date = $request->date;
        $income->source = $request->source;
        $income->budget_id = $budget->id;
        $income->save();

        return response()->json(['Income created successfully', new IncomeResource($income)]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Income  $income
     * @return \Illuminate\Http\Response
     */
    public function show(Income $income)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Income  $income
     * @return \Illuminate\Http\Response
     */
    public function edit(Income $income)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Income  $income
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Budget $budget, Income $income)
    {
        $validator = Validator::make($request->all(), [
            "amount"=> ['required', 'numeric', 'min:10', 'max:10000'],
            "source"=> ['required', 'in:Plata,Bonus,Investicije,Od roditelja,Freelance'],
            'date' => [
                'required',
                'date',
                function ($attribute, $value, $fail) use ($budget) {
                    if ($value < $budget->start_date || $value > $budget->end_date) {
                        $fail("$attribute mora biti između ({$budget->start_date}) i ({$budget->end_date}) budžeta.");
                    }
                }
            ]
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }


        $income->amount = $request->amount;
        $income->date = $request->date;
        $income->source = $request->source;

        $income->save();

        return response()->json(['Income updated successfully', new IncomeResource($income)]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Income  $income
     * @return \Illuminate\Http\Response
     */
    public function destroy(Budget $budget, Income $income)
    {
        $income->delete();
        return response()->json('Income successfully deleted');
    }
}
