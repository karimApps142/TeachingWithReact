<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;



class ProductController extends Controller
{
    function index()
    {
        $products = Product::all();

        return  Inertia::render("Dashboard", ["products" => $products]);
    }

    function store()
    {
        request()->validate([
            "title" => "required",
            "price" => "required|integer|max:10|min:1",
            "image" => "required"
        ]);

        $product =  Product::create([
            "title" => request()->title,
            "price" => request()->price,
            "image" => request()->file("image")->store("images", "public")
        ]);

        if (request()->qty) {
            $product->qty = request()->qty;
            $product->save();
        }



        return  to_route("dashboard");
    }

    function show()
    {
        return  Inertia::render("AddProduct");
    }

    function showCart()
    {
    }
}
