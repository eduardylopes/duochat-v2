export type RoomDto = {
  id: string;
  name: string;
  description?: string;
  isPrivate: boolean;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
};
