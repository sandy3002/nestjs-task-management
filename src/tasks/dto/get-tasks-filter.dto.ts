import { TaskStatus } from "../task.model";

export class GettasksFilterDto{
    status?: TaskStatus;
    search?: string;
}