import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './pages/Layout';
import Welcome from './pages/Welcome';
import Home from './pages/Home';
import './styles/colors.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="vet-visits" element={<div>Cortes de Pelo</div>}/>
          <Route path="providers" element={<div>Cortes de Pelo</div>}/>
          <Route path="grooming" element={<div>Cortes de Pelo</div>} />
          <Route path="vaccinations" element={<div>Vacunas</div>} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;