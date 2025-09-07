import { useState } from "react";

function Counter() {
  // state initialization
  const [count, setCount] = useState(0);

  return (
    <div
      style={{
        border: "1px solid gray",
        borderRadius: "8px",
        padding: "15px",
        margin: "15px",
        textAlign: "center",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h2>Counter App</h2>
      <p>Current Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>{" "}
      <button onClick={() => setCount(count - 1)}>Decrement</button>{" "}
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

export default Counter;
