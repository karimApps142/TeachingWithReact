import { createSlice } from "@reduxjs/toolkit";

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
            } else {
                state.cartItems.push({
                    ...payload,
                    qty: 1,
                });
            }
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

export const { addToCart, increament, decreament } = cartSlice.actions;

export default cartSlice.reducer;
