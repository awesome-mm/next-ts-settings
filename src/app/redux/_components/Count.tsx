"use client";

import {decrement, increment, incrementByAmount, selectCount} from "@/store/modules/counter";
import {useAppDispatch, useAppSelector} from "@/store/store";

export const Count = () => {
  // increment, decrement, incrementByAmount;
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectCount);

  return (
    <div className="ml-5">
      <button aria-label="Increment value" className=" mr-4" onClick={() => dispatch(increment())}>
        Increment
      </button>
      <span className="mr-4">{count}</span>
      <button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
        Decrement
      </button>
    </div>
  );
};
