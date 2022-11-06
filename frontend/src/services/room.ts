import SessionStorage from '@helpers/SessionStorage';
import axios from 'axios';
import { PaginationDto } from 'dtos/pagination.dto';
import { RoomDto } from 'dtos/room.dto';

export const api = axios.create({
  baseURL: import.meta.env.VITE_CHAT_ENDPOINT,
});

interface ICreateRoomDto {
  name: string;
  description?: string;
  password?: string;
  isPrivate: boolean;
  maxUsers: number;
}

interface IUpdateRoomDto extends ICreateRoomDto {}

type ListRoomsDto = {
  data: RoomDto[];
  meta: PaginationDto;
};

export const createRoom = async (data: ICreateRoomDto) => {
  const accessToken = SessionStorage.get('access');

  const response = await api.post('/room', data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
};

export const listRooms = async () => {
  const accessToken = SessionStorage.get('access');

  const response = await api.get<ListRoomsDto>('/room', {
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

export const updateRoom = async (roomId: string, data: IUpdateRoomDto) => {
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
