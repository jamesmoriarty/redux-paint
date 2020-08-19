import { configureStore } from "@reduxjs/toolkit";
import reduce from "./reduce";

const store = configureStore({ reducer: reduce });

// store.subscribe(() => console.log(store.getState()));

export default store;
