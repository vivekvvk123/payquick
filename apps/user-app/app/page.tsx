"use client";
import { Button } from "@repo/ui/button";
import { useAppSelector, useAppDispatch } from "@repo/store";
import {increment, decrement} from "@repo/store";


export default function Home() {

  const dispatch = useAppDispatch()
  const count = useAppSelector((state: any) => state.counter.value)

  function handleIncrement() {
    dispatch(increment())
  }

  function handleDecrement() {
    dispatch(decrement())
  }

  return (
    <div className="text-center">
      <div className="">hello user-app</div>
      <button onClick={handleIncrement}>+</button>
      <p>Count:{count}</p>
      <button onClick={handleDecrement}>-</button>
    </div>

  );
}


// export default async function createUser() {
//   console.log("DATABASE_URL =", process.env.DATABASE_URL);
//   console.log("NODE_ENV =", process.env.NODE_ENV);
//   console.log("PWD =", process.cwd());
//   return <div>Test Page after createUser</div>
// }