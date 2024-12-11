<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ExpenseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public static $wrap = "expense";
    public function toArray($request)
    {
        return [
            "id"=> $this->resource->id,
            "amount"=> $this->resource->amount,
            "category"=> $this->resource->category,
            "description"=> $this->resource->currency,
            "date"=> $this->resource->date,
            "budget"=> new BudgetResource($this->resource->budget)
        ];
    }
}
