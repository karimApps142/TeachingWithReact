import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart";

export default configureStore({
    reducer: {
        cart: cartSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }),
});
