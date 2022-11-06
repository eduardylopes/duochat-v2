import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRoomRequestDto {
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

  @IsOptional()
  @IsString()
  readonly ownerId: string;

  @IsNumber()
  readonly maxUsers: number;
}
