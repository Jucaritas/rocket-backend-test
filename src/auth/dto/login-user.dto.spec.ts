import { validate } from "class-validator";
import { LoginUserDto } from "./login-user.dto";

describe('LoginUserDto', () => {

    it('should be defined', () => {
        expect(LoginUserDto).toBeDefined();
    });

    it('should be valid with correct data', async () => {
        const dto = new LoginUserDto();
        dto.email = 'jhon.doe@test.com';
        dto.password = 'Password123!';

        const errors = await validate(dto);

        expect(errors.length).toBe(0);
    });

    it('should be invalid with empty email and password', async () => {
        const dto = new LoginUserDto();
        dto.email = '';
        dto.password = '';

        const errors = await validate(dto);

        const nameError = errors.find(error => error.property === 'email');
        const passwordError = errors.find(error => error.property === 'password');

        expect(nameError).toBeDefined();
        expect(passwordError).toBeDefined();
    });

    it('should be invalid with empty email', async () => {
        const dto = new LoginUserDto();
        dto.email = '';
        dto.password = 'Password123!';

        const errors = await validate(dto);

        const nameError = errors.find(error => error.property === 'email');
        
        expect(nameError).toBeDefined();
    });

    it('should be invalid with empty password', async () => {
        const dto = new LoginUserDto();
        dto.email = 'jhon.doe@gmail.com';
        dto.password = '';

        const errors = await validate(dto);

        const nameError = errors.find(error => error.property === 'password');
        
        expect(nameError).toBeDefined();
    });

    it('should be invalid with incorrect email', async () => {
        const dto = new LoginUserDto();
        dto.email = 'invalid-email';
        dto.password = 'Password123!';

        const errors = await validate(dto);

        const nameError = errors.find(error => error.property === 'email');

        expect(nameError).toBeDefined();
    });

    it('should be invalid with incorrect password', async () => {
        const dto = new LoginUserDto();
        dto.email = 'jhon.doe@gmail.com';
        dto.password = 'short';

        const errors = await validate(dto);

        const nameError = errors.find(error => error.property === 'password');

        expect(nameError).toBeDefined();
    });

    it('should be invalid with incorrect password', async () => {
        const dto = new LoginUserDto();
        dto.email = 'jhon.doe@gmail.com';
        dto.password = 'short1234';

        const errors = await validate(dto);

        const nameError = errors.find(error => error.property === 'password');

        expect(nameError).toBeDefined();
    });

    it('should be invalid with short password', async () => {
        const dto = new LoginUserDto();
        dto.email = 'jhon.doe@gmail.com';
        dto.password = 'short';

        const errors = await validate(dto);

        const nameError = errors.find(error => error.property === 'password');

        expect(nameError).toBeDefined();
    });

});
