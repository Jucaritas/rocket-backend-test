import { validate } from "class-validator";
import { CreateUserDto } from "./create-user.dto";

describe('CreateUserDto', () => {

    it('should be defined', () => {
        expect(CreateUserDto).toBeDefined();
    });

    it('should be valid with correct data', async () => {
        const dto = new CreateUserDto();
        dto.email = 'jhon.doe@test.com';
        dto.password = 'Password123!';
        dto.fullName = 'John Doe';

        const errors = await validate(dto);

        expect(errors.length).toBe(0);
    });

    it('should be invalid with empty email and password', async () => {
        const dto = new CreateUserDto();
        dto.email = '';
        dto.password = '';
        dto.fullName = '';

        const errors = await validate(dto);

        const nameError = errors.find(error => error.property === 'email');
        const passwordError = errors.find(error => error.property === 'password');
        const fullNameError = errors.find(error => error.property === 'fullName');

        expect(nameError).toBeDefined();
        expect(passwordError).toBeDefined();
        expect(fullNameError).toBeDefined();
    });

    it('should be invalid with empty email', async () => {
        const dto = new CreateUserDto();
        dto.email = '';
        dto.password = 'Password123!';
        dto.fullName = 'Jhon Doe';

        const errors = await validate(dto);

        const nameError = errors.find(error => error.property === 'email');
        
        expect(nameError).toBeDefined();
    });

    it('should be invalid with empty password', async () => {
        const dto = new CreateUserDto();
        dto.email = 'jhon.doe@gmail.com';
        dto.password = '';
        dto.fullName = 'Jhon Doe';

        const errors = await validate(dto);

        const nameError = errors.find(error => error.property === 'password');
        
        expect(nameError).toBeDefined();
    });

    it('should be invalid with incorrect email', async () => {
        const dto = new CreateUserDto();
        dto.email = 'invalid-email';
        dto.password = 'Password123!';
        dto.fullName = 'Jhon Doe';

        const errors = await validate(dto);

        const nameError = errors.find(error => error.property === 'email');

        expect(nameError).toBeDefined();
    });

    it('should be invalid with incorrect password', async () => {
        const dto = new CreateUserDto();
        dto.email = 'jhon.doe@gmail.com';
        dto.password = 'short';
        dto.fullName = 'Jhon Doe';

        const errors = await validate(dto);

        const nameError = errors.find(error => error.property === 'password');

        expect(nameError).toBeDefined();
    });

    it('should be invalid with incorrect password', async () => {
        const dto = new CreateUserDto();
        dto.email = 'jhon.doe@gmail.com';
        dto.password = 'short1234';
        dto.fullName = 'Jhon Doe';

        const errors = await validate(dto);

        const nameError = errors.find(error => error.property === 'password');

        expect(nameError).toBeDefined();
    });

    it('should be invalid with short password', async () => {
        const dto = new CreateUserDto();
        dto.email = 'jhon.doe@gmail.com';
        dto.password = 'short';
        dto.fullName = 'Jhon Doe';

        const errors = await validate(dto);

        const nameError = errors.find(error => error.property === 'password');

        expect(nameError).toBeDefined();
    });

    it('should be invalid with short fullName', async () => {
        const dto = new CreateUserDto();
        dto.email = 'jhon.doe@gmail.com';
        dto.password = 'Password123!';
        dto.fullName = 'J';

        const errors = await validate(dto);
        const nameError = errors.find(error => error.property === 'fullName');

        expect(nameError).toBeDefined();
    });

    it('should be invalid with not string fullname', async () => {
        const dto = new CreateUserDto();
        dto.email = 'jhon.doe@gmail.com';
        dto.password = 'Password123!';
        dto.fullName = 1234 as any;

        const errors = await validate(dto);
        const nameError = errors.find(error => error.property === 'fullName');

        expect(nameError).toBeDefined();
    });

    it('should be invalid with not string email', async () => {
        const dto = new CreateUserDto();
        dto.email = 1234 as any;
        dto.password = 'Password123!';
        dto.fullName = 'Jhon Doe';

        const errors = await validate(dto);
        const nameError = errors.find(error => error.property === 'email');

        expect(nameError).toBeDefined();
    });

    it('should be invalid with not string password', async () => {
        const dto = new CreateUserDto();
        dto.email = 'jhon.doe@gmail.com';
        dto.password = 1234 as any;
        dto.fullName = 'Jhon Doe';

        const errors = await validate(dto);
        const nameError = errors.find(error => error.property === 'password');

        expect(nameError).toBeDefined();
    });

});
