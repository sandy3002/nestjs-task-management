import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './auth/users.repository';

@Module({
  imports: [TasksModule, AuthModule, TypeOrmModule.forFeature([UserRepository])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
