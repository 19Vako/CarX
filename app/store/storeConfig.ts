import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, Reducer } from "@reduxjs/toolkit";
import type { Action } from "redux";
import { persistReducer } from "redux-persist";

import UserSlice from "./user/UserSlice";

const persist = <S, A extends Action = Action<string>>(
  key: string,
  reducer: Reducer<S, A>,
) =>
  persistReducer(
    {
      key,
      storage: AsyncStorage,
    },
    reducer as Reducer<S, A>,
  );

const combinePersistReducers = <T extends Record<string, Reducer<any, Action>>>(
  reducers: T,
) =>
  Object.keys(reducers).reduce(
    (acc, key) => {
      (acc as any)[key] = persist(key, (reducers as any)[key]);
      return acc;
    },
    {} as { [K in keyof T]: Reducer<any, Action> },
  );

const rootReduser = combineReducers({
  ...combinePersistReducers({
    user: UserSlice,
  }),
});

export default rootReduser;
