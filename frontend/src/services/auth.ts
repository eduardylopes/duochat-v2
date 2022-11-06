import axios from 'axios';
import LocalStorage from '../helpers/LocalStorage';
import SessionStorage from '../helpers/SessionStorage';

interface ITokenResponse {
  accessToken: string;
  refreshToken: string;
}

interface ISignUpRequest {
  username: string;
  password: string;
}

interface IUser {
  username: string;
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_CHAT_ENDPOINT,
});

export const signIn = async (username: string, password: string) => {
  const data = { username, password };

  const response = await api.post<ITokenResponse>('/auth/signIn', data);

  SessionStorage.set('access', response.data.accessToken);
  LocalStorage.set('refresh', response.data.refreshToken);
};

export const signUp = async (data: ISignUpRequest) => {
  await api.post('/auth/signUp', data);
};

export const refresh = async () => {
  const refreshToken = LocalStorage.get('refresh');

  const response = await api.post<ITokenResponse>('/auth/refresh', {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  SessionStorage.set('access', response.data.accessToken);
};

export const me = async () => {
  const accessToken = SessionStorage.get('access');

  const defaultValue = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    const response = await api.get<IUser>('/user/me', defaultValue);
    return response;
  } catch (error: any) {
    await refresh();
    const response = await api.get<IUser>('/user/me', defaultValue);
    return response;
  }
};
