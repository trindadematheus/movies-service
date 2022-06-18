import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDTO {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly is_admin: boolean;
  readonly is_active: boolean;
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
