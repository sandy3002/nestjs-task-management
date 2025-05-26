import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto'
import { GettasksFilterDto } from './dto/get-tasks-filter.dto';
@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    private tasks: Task[] = [];

    @Get()
    getTasks(@Query() filterDto: GettasksFilterDto): Task[] {
        // update
        // if we have filters, return filtered data
        // else return all data

        if(Object.keys(filterDto).length){
            return this.tasksService.getTasksWithFilters(filterDto);
        }
        else
            return this.tasksService.getAllTasks();
    }
    // http://loacalhost:3000/tasks/hijibiji
    @Get('/:id')
    getTaskById(@Param('id') id:string): Task{
        return this.tasksService.getTaskById(id)
    }    

    @Delete('/:id')
    deleteTaskById(@Param('id') id:string):string{
        return this.tasksService.deleteTaskById(id)
    }

    @Patch('/:id/status')
    patchTaskStatusById(
        @Param('id') id:string, 
        @Body('status') status: TaskStatus
    ): Task {
        return this.tasksService.patchTaskStatusById(id, status)
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Task {

        //     console.log('title', title)
        //     console.log('description', description)
        // }



        return this.tasksService.createTask(createTaskDto)
    }
}
