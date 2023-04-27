import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    cartItems: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, { payload }) => {
            const existItem = state.cartItems.find((p) => p.id === payload.id);
            if (existItem) {
                state.cartItems.map((p, i) =>
                    p.id === payload.id ? state.cartItems[i].qty++ : null
                );
                axios
                    .post(
                        "http://127.0.0.1:8000/api/update/cart/" + payload.id,
                        {
                            ...existItem,
                            qty: existItem.qty,
                        }
                    )
                    .then((response) => {
                        console.log(response.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                state.cartItems.push({
                    ...payload,
                    qty: 1,
                });
                axios
                    .post("http://127.0.0.1:8000/api/update/cart", {
                        ...payload,
                        qty: 1,
                    })
                    .then((response) => {
                        console.log(response.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        },
        setCartItems: (state, { payload }) => {
            state.cartItems = payload;
        },
        increament: (state, { payload }) => {
            const existItem = state.cartItems.find((p) => p.id === payload);
            if (existItem) {
                state.cartItems.map((p, i) =>
                    p.id === payload ? state.cartItems[i].qty++ : null
                );
            }
        },
        decreament: (state, { payload }) => {
            const existItem = state.cartItems.find((p) => p.id === payload);
            if (existItem && existItem.qty > 1) {
                state.cartItems.map((p, i) =>
                    p.id === payload ? state.cartItems[i].qty-- : null
                );
            } else if (existItem) {
                state.cartItems = state.cartItems.filter(
                    (p) => p.id !== payload
                );
            }
        },
    },
});

export const { addToCart, increament, decreament, setCartItems } =
    cartSlice.actions;

export default cartSlice.reducer;
