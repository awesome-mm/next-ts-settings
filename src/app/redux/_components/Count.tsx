"use client";

import {useAppDispatch, useAppSelector} from "@/hooks/useReduxHooks";
import {decrement, increment, incrementByAmount, selectCount} from "@/store/modules/counter";

export const Count = () => {
  // increment, decrement, incrementByAmount;
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectCount);

  return (
    <div>
      <button aria-label="Increment value" onClick={() => dispatch(increment())}>
        Increment
      </button>
      <span>{count}</span>
      <button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
        Decrement
      </button>
    </div>
  );
};
