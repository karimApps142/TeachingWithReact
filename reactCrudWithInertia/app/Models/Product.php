<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function getImageAttribute($value)
    {
        $urlParts = parse_url($value);
        if (isset($urlParts['scheme']) && ($urlParts['scheme'] === 'http' || $urlParts['scheme'] === 'https')) {
            return $value;
        }
        return asset('storage/' . $value);
    }
}
