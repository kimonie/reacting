import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Counter from './projects/Counter/Counter';
import Todo from './projects/Todo/Todo';
import QuoteGenerator from './projects/Quote/QuoteGenerator';
import './theme.css';
import './App.css';
import './Home.css'; 

function App() {
  return (
    <Router className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/todo" element={<Todo />} /> 
        <Route path="/quotes" element={<QuoteGenerator />} />
        {/* Add more routes here */}
      </Routes>
    </Router>
  );
}

export default App;
