import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ManagerLayout from './components/layout/ManagerLayout';
import Dashboard from './pages/Dashboard';
import Approvals from './pages/Approvals';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ManagerLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="approvals" element={<Approvals />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}
