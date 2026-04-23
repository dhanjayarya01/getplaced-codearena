import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./style.css";

function Counter() {
  const [count, setCount] = useState(1);
  const [history, setHistory] = useState([1]);

  const handleDouble = () => {
    // TODO: Fix this logic — count should become count * 2, NOT count + 2
    // BUG: The operator is wrong here
    const newCount = count + 2;

    setCount(newCount);
    setHistory((prev) => [...prev, newCount]);
  };

  const handleReset = () => {
    setCount(1);
    setHistory([1]);
  };

  return (
    <div className="container">
      <h1 className="title">🔢 Doubling Counter</h1>
      <p className="subtitle">Every click should <strong>double</strong> the count</p>

      <div className="card">
        <div className="count-display">{count}</div>

        <div className="btn-group">
          <button className="btn btn-primary" onClick={handleDouble}>
            Double It!
          </button>
          <button className="btn btn-secondary" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>

      <div className="history">
        <h3>History</h3>
        <div className="history-list">
          {history.map((val, idx) => (
            <span key={idx} className="history-badge">
              {val}
            </span>
          ))}
        </div>
        {/* TODO: Add a feature to show how many times button was clicked */}
      </div>

      <div className="hint">
        <p>💡 <strong>Hint:</strong> Check the operator inside <code>handleDouble()</code></p>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Counter />);
