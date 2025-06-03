import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Counter.css'; // Add this line

function Counter() {
  const [count, setCount] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`counter-container ${darkMode ? 'dark' : ''}`}>
      {/* <div className="counter-container"> */}
        <h2>🧮 Counter App</h2>
        <div className="counter-display">{count}</div>
        <p className="click-info">🔢 Total Clicks: {clicks}</p>
        <div className="counter-buttons">
          <button className="btn decrement" onClick={() => {setCount(count - 1); setClicks(clicks + 1);}}>Decrement</button>
          <button className="btn reset" onClick={() => setCount(0)}>Reset</button>
          <button className="btn increment" onClick={() => {setCount(count + 1); setClicks(clicks + 1);}}>Increment</button>
        </div>
        <Link className="back-link" to="/">⬅ Back to Home</Link>
        <div>
          <button
              className="btn toggle-mode"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
        </div>
      {/* </div> */}
    </div>
  );
}

export default Counter;
