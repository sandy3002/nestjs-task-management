import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import {v4 as uuid} from 'uuid'
import { CreateTaskDto } from './dto/create-task.dto';
import { GettasksFilterDto } from './dto/get-tasks-filter.dto';
import { NotFoundError } from 'rxjs';
@Injectable()
export class TasksService {
    
    private tasks : Task[] = [];
    
    getAllTasks():Task[]{
        return this.tasks;
    }
    getTasksWithFilters(filterDto:GettasksFilterDto): Task[] {
    const {status,search} = filterDto;

    // define temporary array
    let tasks = this.getAllTasks();

    if(status){
        tasks = tasks.filter((task) => task.status === status);
    }
    
    if(search){
        tasks = tasks.filter(
            (task) => {
                if(task.title.includes(search) || task.description.includes(search)) {
                    return true;
                }
                return false;
            }
        )
    }

    return tasks;
}

    getTaskById(id:string): Task{

        // try to get task
        const found = this.tasks.find((task) => task.id === id);

        // if not found throw error (404 not found)

        if (!found) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
        // otherwse retrurn the task
        return found;
    }

    deleteTaskById(id:string): string{
        const found = this.tasks.find((task) => task.id === id);
        if (!found) {
            throw new Error(`Task with ID "${id}" not found`);
        }
        this.tasks = this.tasks.filter((task) => task.id !== id);
        return "found and deleted task with id: " + id;
    }

    patchTaskStatusById(id:string, status: TaskStatus): Task{
        const found = this.getTaskById(id);
        if (!found) {
            throw new Error(`Task with ID "${id}" not found`);
        }
        found.status = status;
        return found;
    }
    createTask(createTaskDto : CreateTaskDto):Task{

        const { title, description} = createTaskDto
            const task:Task ={
                id:uuid(),
                title,
                description,
                status:TaskStatus.OPEN,
            };
            this.tasks.push(task);
    
            return task;
        }

}

