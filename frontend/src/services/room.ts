import SessionStorage from '@helpers/SessionStorage';
import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_CHAT_ENDPOINT,
});

interface ICreateRoomDTO {
  roomName: string;
  password?: string;
  isPrivate: boolean;
  maxUsers: number;
}

interface IUpdateRoomDTO extends ICreateRoomDTO {}

export const createRoom = async (data: ICreateRoomDTO) => {
  const accessToken = SessionStorage.get('access');

  const response = await api.post('/', {
    data,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
};

export const listRooms = async () => {
  const accessToken = SessionStorage.get('access');

  const response = await api.get('/room', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
};

export const deleteRoom = async (roomId: string) => {
  const accessToken = SessionStorage.get('access');

  const response = await api.delete(`/room/${roomId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
};

export const updateRoom = async (roomId: string, data: IUpdateRoomDTO) => {
  const accessToken = SessionStorage.get('access');

  const response = await api.patch(`/room/${roomId}`, {
    data,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
};

export const findRoomById = async (roomId: string) => {
  const accessToken = SessionStorage.get('access');

  const response = await api.patch(`/room/${roomId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
};
