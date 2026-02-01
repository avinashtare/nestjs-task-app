import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @Length(3, 50)
  email: string;

  @IsString()
  @Length(8, 255)
  @IsStrongPassword({ minLength: 8 })
  password: string;
}

export class LoginDto {
  @IsEmail()
  @Length(3, 50)
  email: string;

  @IsString()
  @Length(8, 255)
  password: string;
}
