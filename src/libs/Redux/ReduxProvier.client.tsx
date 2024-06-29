"use client";

import {useRef} from "react";
import {Provider} from "react-redux";
import {AppStore, makeStore} from "@/store/store";

type Props = {
  children: React.ReactNode;
};
const ReduxProvider = ({children}: Props) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default ReduxProvider;
