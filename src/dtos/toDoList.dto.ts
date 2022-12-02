import { IsBoolean, IsOptional, IsNotEmpty, MaxLength } from 'class-validator';

export class GetToDoListDto {
  @IsNotEmpty()
  limit: number;

  @IsNotEmpty()
  page: number;

  isCompleted: boolean;
}
export class CreateToDoDto {
  @IsNotEmpty()
  @MaxLength(255)
  content: string;
}

export class UpdateToDoDto {
  @MaxLength(255)
  @IsOptional()
  content: string;

  @IsBoolean()
  @IsOptional()
  isCompleted: boolean;
}
