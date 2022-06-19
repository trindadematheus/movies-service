import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsEmail, IsString } from 'class-validator';

export class QueryDTO {
  readonly page?: string;
  readonly take?: string;
  readonly order?: 'asc' | 'desc';
  readonly admin?: 'all' | 'true' | 'false';
  readonly active?: 'all' | 'true' | 'false';
}

export class CreateUserDTO {
  @IsString()
  readonly name: string;

  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsBoolean()
  readonly is_admin: boolean;
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {
  @IsBoolean()
  readonly is_active?: boolean;
}
