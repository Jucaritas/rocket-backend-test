import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

    @ApiProperty({ example: 'jhon.doe@gmail.com', description: 'Email of the user' })
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'Password123!', description: 'Password of the user' })
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;

    @ApiProperty({ example: 'John Doe', description: 'Full name of the user' })
    @IsString()
    @MinLength(1)
    fullName: string;

}
