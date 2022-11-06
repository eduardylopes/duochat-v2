import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsString()
  readonly password?: string;

  @IsBoolean()
  readonly isPrivate: boolean;

  @IsString()
  readonly ownerId: string;

  @IsNumber()
  readonly maxUsers: number;
}
