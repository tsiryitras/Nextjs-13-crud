"use client";

import type { RootState } from "./stores/stores";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, incrementByAmount } from "./stores/counterSlice";
import { log } from "console";

export default function Home() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Home Page</h2>

      <div className="flex justify-between container border rounded-sm">
        <span>{count}</span>
        <button
          className="btn btn-primary"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <button
          className="btn btn-primary"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
        <button
          className="btn btn-primary"
          onClick={() => dispatch(incrementByAmount(2))}
        >
          Increment By 2
        </button>
      </div>
    </div>
  );
}
