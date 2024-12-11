<?php

namespace App\Http\Controllers;

use App\Http\Resources\BudgetCollection;
use App\Http\Resources\BudgetResource;
use App\Models\Budget;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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
            'category' => ['required', 'in:Hrana,Stanovanje,Odeca,Kuca,Putovanja'],
            'limit' => ['required', 'numeric', 'min:10', 'max:10000'],
            'start_date' => ['required', 'date', 'before:end_date'],
            'end_date' => ['required', 'date', 'after:start_date'],
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $budget = new Budget;
        $budget->category = $request->category;
        $budget->limit = $request->limit;
        $budget->start_date = $request->start_date;
        $budget->end_date = $request->end_date;
        $budget->user_id = auth()->id();


        $budget->save();

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
        // Korisnik moze promeniti samo budget koji je on napravio
        if ($budget->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized: You can only update your own budgets.'], 403);
        }

        $validator = Validator::make($request->all(), [
            'category' => ['required', 'in:Hrana,Stanovanje,Odeca,Kuca,Putovanja'],
            'limit' => ['required', 'numeric', 'min:10', 'max:10000'],
            'start_date' => ['required', 'date', 'before:end_date'],
            'end_date' => ['required', 'date', 'after:start_date'],
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $budget->category = $request->category;
        $budget->limit = $request->limit;
        $budget->start_date = $request->start_date;
        $budget->end_date = $request->end_date;

        $budget->save();

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
        $budget->delete();

        return response()->json('Budget successfully deleted');
    }
}
