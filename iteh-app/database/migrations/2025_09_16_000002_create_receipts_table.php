<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('receipts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('expense_id')->constrained()->cascadeOnDelete();
            $table->string('path');     // storage path
            $table->string('mime');     // image/png, application/pdf...
            $table->unsignedInteger('size'); // bytes
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('receipts');
    }
};