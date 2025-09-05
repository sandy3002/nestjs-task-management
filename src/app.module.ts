import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './task/task.module';


@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://sandy3002:EjnyFLbnJfz93IpS@task-management.8kmwozh.mongodb.net/?retryWrites=true&w=majority&appName=task-management'
    ),
    TasksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
