import {counter} from "./modules/counter";
import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";
import {createWrapper} from "next-redux-wrapper";

export const store = configureStore({
  reducer: {
    counter: counter.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;

export type AppStore = typeof store;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;
// import {createWrapper} from "next-redux-wrapper";
// export const wrapper = createWrapper<AppStore>(store);

// export const wrapper = createWrapper<AppStore>(store);
