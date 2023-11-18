import { Reducer, configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import { rootPersistConfig, rootReducer } from "./rootReducer";

type GetReducerT<C extends Reducer<any>> = C extends Reducer<infer T>
  ? T
  : unknown;
export type RootReducerState = GetReducerT<typeof rootReducer>;

const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

const persistor = persistStore(store);

const { dispatch } = store;

const useSelector: TypedUseSelectorHook<RootReducerState> = useAppSelector;

const useDispatch: () => typeof store.dispatch = () => useAppDispatch();

export { store, persistor, dispatch, useSelector, useDispatch };
