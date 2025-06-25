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


type SendPredictionParams = {
  formData: FormData;
  accessToken: string;
};

export async function sendPredictionRequest({
  formData,
  accessToken,
}: SendPredictionParams): Promise<Response> {
  try {
    const response = await fetch(
      'https://pokedex-back-end-production-9709.up.railway.app/image-processing/predict',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error('Erro ao enviar imagem para predição:', error);
    throw error;
  }
}



