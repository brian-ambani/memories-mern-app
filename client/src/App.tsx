import { useState } from "react";
import "./App.css";
import { Button } from "react-bootstrap";

function App() {
  const [count, setCount] = useState(0);

  const addCount = () => {
    setCount(count + 1);
  };
  return (
    <div className="App">
      <Button onClick={addCount}>Clicked {count} times</Button>
    </div>
  );
}

export default App;
