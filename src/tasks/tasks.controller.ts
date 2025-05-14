import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    private tasks: Task[] = [];

    @Get()
    getAllTasks(): Task[] {
        return this.tasksService.getAllTasks();
    }

    


    @Post()
    createTask(
        @Body('title') title,
        @Body('description') description,
    ): Task {

        //     console.log('title', title)
        //     console.log('description', description)
        // }

        return this.tasksService.createTask(title, description)
    }
}
