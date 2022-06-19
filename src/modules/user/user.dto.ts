import { PartialType } from '@nestjs/mapped-types';

export class QueryDTO {
  page?: string;
  take?: string;
  order?: 'asc' | 'desc';
  admin?: 'all' | 'true' | 'false';
  active?: 'all' | 'true' | 'false';
}

export class CreateUserDTO {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly is_admin: boolean;
  readonly is_active: boolean;
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
