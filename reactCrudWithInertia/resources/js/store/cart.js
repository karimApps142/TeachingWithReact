import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, { payload }) => {
            const existItems = state.cartItems.find((p) => p.id === payload.id);
            if (existItems) {
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
    },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
