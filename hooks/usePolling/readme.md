# Use polling hook

## Description

This hook offers easy support for long polling.

## Example use case

```jsx
import React, { useState } from "react";
import { usePolling } from "./usePolling";

const App = () => {
  const [counter, setCounter] = useState(0);

  const fetchData = async () => {
    const response = await fetch(`https://api.example.com/counter`);
    const data = await response.json();
    setCounter(data.counter);
  };

  const shouldStopPolling = () => counter >= 10;

  usePolling(fetchData, 1000, shouldStopPolling);

  return (
    <div>
      <h1>Counter: {counter}</h1>
    </div>
  );
};

export default App;
```
