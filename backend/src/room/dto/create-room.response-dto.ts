export class CreateRoomResponseDto {
  id: string;
  name: string;
  description: string;
  ownerId: string;

  constructor(data: CreateRoomResponseDto) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.ownerId = data.ownerId;
  }
}
