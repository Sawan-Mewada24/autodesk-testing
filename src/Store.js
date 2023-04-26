// import { configureStore } from "@reduxjs/toolkit";
// import { setupListeners } from "@reduxjs/toolkit/query";
// import { combineReducers } from "@reduxjs/toolkit";
// import { apiSlice } from "../features/apiSlice";
// import storage from "redux-persist/lib/storage";
// import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
// const persistConfig = {
//   key: "root",
//   storage: storage,
//   whitelist: ["login"],
// };
// export const rootReducers = combineReducers({
//   [apiSlice.reducerPath]: apiSlice.reducer,
// });
// const persistedReducer = persistReducer(persistConfig, rootReducers);
// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }).concat(apiSlice.middleware),
// });
// setupListeners(store.dispatch);
// export default store;

import { configureStore, combineReducers } from "@reduxjs/toolkit";

import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import ValueSlice from "./Slice";

const persistConfig = {
  key: "root",
  storage,
};
const reducer = combineReducers({
  login: ValueSlice,
});

const persistedReducer = persistReducer(persistConfig, reducer);
const Store = configureStore({
  reducer: persistedReducer,
});
export default Store;
