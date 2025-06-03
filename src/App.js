import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Counter from './projects/Counter/Counter';
import './App.css';
import './Home.css'; 

function App() {
  return (
    <Router className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/counter" element={<Counter />} />
        {/* Add more routes here */}
      </Routes>
    </Router>
  );
}

export default App;
