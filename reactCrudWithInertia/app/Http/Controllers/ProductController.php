<?php

namespace App\Http\Controllers;

use App\Models\Cart;
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
        return  Inertia::render("Cart");
    }

    function createCart()
    {
        $validate =  request()->validate([
            'title' => "required",
            'price' => "required",
            'qty' => "required",
            'image' => "required",
        ]);

        Cart::create($validate);

        return response()->json(['message' => "created"]);
    }

    function updateCart(Cart $cart)
    {
        $validate =  request()->validate([
            'title' => "required",
            'price' => "required",
            'qty' => "required",
            'image' => "required",
        ]);

        $cart->update($validate);

        return response()->json(['message' => "updated"]);
    }

    function getCartItems()
    {

        $cart = Cart::all();
        return response()->json($cart);
    }
}
