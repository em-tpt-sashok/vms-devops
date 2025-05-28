import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import DeviceDiscovery from './components/DeviceDiscovery';
import LiveTab from './components/LiveTab';
import DeviceSetting from './components/DeviceSetting'; // adjust path if needed

const App: React.FC = () => {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<DeviceDiscovery />} />
          <Route path="/tab" element={<LiveTab />} />
        </Routes>
      </Router>
    );
};

export default App;
