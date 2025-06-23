import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Home} from './pages/Home';
import {Blog} from './pages/Blog';
import {Research} from './pages/Research';
import {Projects} from './pages/Projects';
import {CeremoniesTable} from './pages/CeremoniesTable';
import { Navbar } from './components/Navbar/NavBar';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/research" element={<Research />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/ceremonies-table" element={<CeremoniesTable />} />
      </Routes>
    </Router>
  );
}
