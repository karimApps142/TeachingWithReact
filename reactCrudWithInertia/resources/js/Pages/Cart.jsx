import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { decreament, increament } from "@/store/cart";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

export default function Cart({ auth }) {
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);
    const [items, setItems] = useState(cartItems);

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/cart")
            .then((response) => {
                setItems(response.data);
                
            })
            .catch((error) => {
                console.log(error);
            });
    }, [items]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Cart
                </h2>
            }
        >
            <Head title="Cart" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex items-center flex-wrap">
                    {items.map((cartItem) => (
                        <div
                            className="p-2 rounded-lg shadow bg-white m-2"
                            key={cartItem.id}
                        >
                            <img
                                className="w-full h-16 rounded object-cover"
                                src={cartItem.image}
                            />
                            <p className="text-lg font-bold ">
                                {cartItem.title}
                            </p>
                            <p>$ {cartItem.price * cartItem.qty}</p>
                            <div className="flex items-center justify-center mt-2">
                                <button
                                    onClick={() =>
                                        dispatch(decreament(cartItem.id))
                                    }
                                    className="mr-2 bg-green-700 text-white rounded shadow px-3"
                                >
                                    -
                                </button>
                                <span>{cartItem.qty}</span>
                                <button
                                    onClick={() =>
                                        dispatch(increament(cartItem.id))
                                    }
                                    className="ml-2 bg-green-700 text-white rounded shadow px-3"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex items-end justify-center flex-col self-end mr-4 sm:px-6 ">
                    <h2>Total</h2>
                    <span>
                        ${" "}
                        {cartItems
                            .map((p) => p.price * p.qty)
                            .reduce((add, a) => add + a, 0)}
                    </span>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
