import { Link } from 'react-router-dom';
import './Navbar.css';


export const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">Home</Link>
        </li>
        <li className="navbar-item">
          <Link to="/blog" className="navbar-link">Blog</Link>
        </li>
        <li className="navbar-item">
          <Link to="/research" className="navbar-link">Research</Link>
        </li>
        <li className="navbar-item">
          <Link to="/projects" className="navbar-link">Projects</Link>
        </li>
        <li className="navbar-item">
          <Link to="/ceremonies-table" className="navbar-link">Ceremonies Table</Link>
        </li>
      </ul>
    </nav>
  );
};
