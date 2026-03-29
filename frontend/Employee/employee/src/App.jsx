import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import EmployeeLayout from './components/layout/EmployeeLayout';
import MyRequests from './pages/MyRequests';
import CreateRequest from './pages/CreateRequest';
import Settings from './pages/Settings';
import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmployeeLayout />}>
          <Route index element={<Navigate to="/my-requests" replace />} />
          <Route path="my-requests" element={<MyRequests />} />
          <Route path="new-request" element={<CreateRequest />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/my-requests" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}
