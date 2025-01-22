<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class IncomeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public static $wrap = "income";
    public function toArray($request)
    {
        return [
            "id"=> $this->resource->id,
            "amount"=> $this->resource->amount,
            "source"=> $this->resource->source,
            "date"=> $this->resource->date,
            "budget"=> new BudgetResource($this->resource->budget)
        ];
    }
}
