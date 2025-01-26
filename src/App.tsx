import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Photolist from "./components/Photolist";
import PhotoDetail from "./components/PhotoDetail";

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Photolist />} />
      <Route path="/photo/:id" element={<PhotoDetail />} />
    </Routes>
  </Router>
  );
}

export default App;
