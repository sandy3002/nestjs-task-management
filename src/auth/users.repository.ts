import { Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";

@Injectable()
export class UserRepository extends User {

     async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;

        const user = this.create({ username, password });
        console.log(`Creating user: ${JSON.stringify(user)}`);
        
        try {
            await this.save(user);
        } catch (error) {
            if(error.code === '23505') {
                throw new ConflictException('Duplicate user')
            }
            else {
                throw new InternalServerErrorException();
            }
        }
    }
    save(user: void) {
        throw new Error("Method not implemented.");
    }
    create(arg0: { username: string; password: string; }) {
        throw new Error("Method not implemented.");
    }
}