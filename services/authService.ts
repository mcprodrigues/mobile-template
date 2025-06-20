import { api } from './api';

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
  token: string;
}) {
  const response = await api.post(`/users/create/${data.token}`, data);
  return response.data;
}

export async function requestToken(data: { email: string }) {
  const response = await api.post('/auth/send-totp-token', data); 
  return response.data;
}


export async function loginUser(data: {
  email: string;
  password: string;
}) {
  const response = await api.post('/auth/login', data);
  return response.data; 
}


export async function changePasswordWithToken(data: {
  email: string;
  password: string;
  token: string;
}) {
  const response = await api.patch(`/users/change-password/${data.token}`, {
    email: data.email,
    password: data.password,
  });
  return response.data;
}





