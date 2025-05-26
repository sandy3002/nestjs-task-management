import { IsEnum, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../task.model";

export class GettasksFilterDto{
    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;

    @IsOptional()
    @IsString()
    search?: string;
}