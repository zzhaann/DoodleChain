import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Room from './components/Room';
import DrawingCanvas from './components/DrawingCanvas';
import Results from './components/Results';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room/:roomId" element={<Room />} />
          <Route path="/task/:taskId" element={<DrawingCanvas />} />
          <Route path="/room/:roomId/results" element={<Results />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
