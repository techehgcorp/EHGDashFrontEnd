import axios from 'axios';

const API_URL = 'http://localhost:8000/company';

export const fetchCompanies = async () => {
  const res = await axios.get(`${API_URL}/list/`);
  return res.data;
};

export const createCompany = async (company) => {
  const res = await axios.post(`${API_URL}/create/`, company);
  return res.data;
};

export const updateCompany = async (id, company) => {
  const res = await axios.put(`${API_URL}/details/${id}/`, company);
  return res.data;
};

export const deleteCompany = async (id) => {
  const res = await axios.delete(`${API_URL}/delete/${id}/`);
  return res.data;
};
