import api from './api';

export const loginUser = async (username, password) => {
  const response = await api.post('/login/', { username, password });
  return response.data;
};


export const signupUser = async (username, email, password) => {
  const response = await api.post('/users/', { username, email, password });
  return response.data;
};

