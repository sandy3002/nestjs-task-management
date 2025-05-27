import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [TasksModule, AuthModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
