import {useSelector, useDispatch, useStore} from "react-redux";
import {counter} from "./modules/counter";
import {configureStore, ThunkAction, Action} from "@reduxjs/toolkit";

export const makeStore = () => {
  return configureStore({
    reducer: {counter: counter.reducer},
  });
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<ThunkReturnType, RootState, unknown, Action>;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
