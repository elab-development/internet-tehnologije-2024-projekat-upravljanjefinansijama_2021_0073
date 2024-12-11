<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;


class BudgetResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public static $wrap = "budget";
    public function toArray($request)
    {
        return [
            "id"=> $this->resource->id,
            "category"=> $this->resource->category,
            "limit"=> $this->resource->limit,
            "start_date"=> $this->resource->start_date,
            "end_date"=> $this->resource->end_date
        ];

    }
}
