import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">🚀 React Mini Projects</h1>
      <p className="home-subtitle">Learn React by building fun things</p>
      <ul className="project-list">
        <li><Link className="project-link" to="/counter">🧮 Counter App</Link></li>
        <li><Link to="/todo" className="project-link">📝 To-Do List</Link></li>
        <li><Link to="/quotes" className="project-link">💬 Quote Generator</Link></li>
        {/* Add more project links here */}
      </ul>
    </div>
  );
}

export default Home;
