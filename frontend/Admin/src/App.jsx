import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Auth Pages
import AdminLogin from './admin/pages/Auth/AdminLogin';
import AdminSignup from './admin/pages/Auth/AdminSignup';

// Admin Layout
import AdminLayout from './admin/components/layout/AdminLayout';

// Admin Pages
import Dashboard from './admin/pages/Dashboard';
import ManageUsers from './admin/pages/Users/ManageUsers';
import ApprovalRules from './admin/pages/Approval/ApprovalRules';
import Settings from './admin/pages/Settings/Settings';
import AddUser from './admin/pages/Users/AddUser';
import Approvers from './admin/pages/Users/Approvers';
import CreateRule from './admin/pages/Approval/CreateRule';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/signup" element={<AdminSignup />} />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="users/new" element={<AddUser />} />
          <Route path="users/approvers" element={<Approvers />} />
          <Route path="rules" element={<ApprovalRules />} />
          <Route path="rules/new" element={<CreateRule />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
