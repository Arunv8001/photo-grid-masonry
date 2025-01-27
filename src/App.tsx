import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from "react";
const PhotoDetail = React.lazy(() => import('./components/PhotDetail/PhotoDetail'));
const Photolist = React.lazy(() => import('./components/Photolist/Photolist'));

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
