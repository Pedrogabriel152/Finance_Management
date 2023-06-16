<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('incomes', function (Blueprint $table) {
            $table->integer('installments_received')->nullable(false)->default(0);
            $table->boolean('received_income')->nullable(false)->default(false);
            $table->date('expires')->default('01-01-2023');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('incomes', function (Blueprint $table) {
            $table->dropColumn('installments_received');
            $table->dropColumn('received_income');
            $table->dropColumn('expires');
        });
    }
};
