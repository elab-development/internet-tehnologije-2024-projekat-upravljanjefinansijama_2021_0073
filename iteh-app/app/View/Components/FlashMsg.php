<?php

namespace App\View\Components;

use Illuminate\View\Component;

class FlashMsg extends Component
{
    public function render()
    {
        return view('components.flash-msg');
    }
}