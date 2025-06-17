import { api } from './api';

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  const response = await api.post('/users/create', data);
  return response.data;
}

export async function loginUser(data: {
  email: string;
  password: string;
}) {
  const response = await api.post('/auth/login', data);
  return response.data; // token, user info, etc
}

export async function changePassword(userId: string, currentPassword: string, newPassword: string) {
  const response = await api.post(`/users/change-password/${userId}`, {
    currentPassword,
    newPassword,
  });
  return response.data;
}
