import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
@Injectable()
export class AuthService {
    private users: User[] = [];

    constructor(
        private jwtService: JwtService
    ) {}

    signUp(authCredentialsDto: AuthCredentialsDto): User{

        const { username, password} = authCredentialsDto
        //hash the password 
        const salt = crypto.randomBytes(4).toString('hex');
        const hashedPassword = crypto.createHash('sha256').update(password + salt).digest('hex');
        console.log(`Hashed password: ${hashedPassword}`);
        
        
        const user : User ={
            username: username,
            password: hashedPassword,
            id: uuidv4(),
            salt: salt,
        };



            if (this.users.find(user => user.username === username)) {
                throw new ConflictException('User already exists');
            }
            this.users.push(user);
    
            return user;
        }

// sign in
    signIn(authCredentialsDto: AuthCredentialsDto): string {
        const { username, password } = authCredentialsDto;
        const user = this.users.find(user => user.username === username);

        if(user && 
            (crypto.createHash('sha256').update(password + user.salt).digest('hex') 
            === user.password)) {
                const payload : JwtPayload= { username};
                const accessToken = this.jwtService.sign(payload);
            // return `User ${username} signed in successfully`;
            return accessToken; 
        }
        throw new UnauthorizedException('Invalid credentials');
    }
}
