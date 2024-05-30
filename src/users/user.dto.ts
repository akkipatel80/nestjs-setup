import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class UserDto {
  username: string;
  email: string;
  name: string;
  dob: string;
}
