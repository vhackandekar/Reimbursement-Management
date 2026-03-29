import axios from 'axios';

// Mocked for frontend logic, can be replaced with actual backend URL
axios.defaults.baseURL = 'http://localhost:5000';

export const createUser = (data) => axios.post("/api/users", data);
export const getUsers = () => axios.get("/api/users");
export const updateUser = (id, data) => axios.put(`/api/users/${id}`, data);
export const deleteUser = (id) => axios.delete(`/api/users/${id}`);
export const sendPassword = (id) => axios.post(`/api/users/send/${id}`);

export const createRule = (data) => axios.post("/api/rules", data);
export const getRules = () => axios.get("/api/rules");

export const updateSettings = (data) => axios.post("/api/settings", data);
