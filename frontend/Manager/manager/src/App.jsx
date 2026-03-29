import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ManagerLayout from './components/layout/ManagerLayout';
import Approvals from './pages/Approvals';
import Team from './pages/Team';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ManagerLayout />}>
          <Route index element={<Navigate to="/approvals" replace />} />
          <Route path="approvals" element={<Approvals />} />
          <Route path="team" element={<Team />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/approvals" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}
