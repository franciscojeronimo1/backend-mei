import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  @Get()
  findAllTasks() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  getOneTask(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    return this.tasksService.findOne(id);
  }
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): any {
    console.log(createTaskDto);
    return this.tasksService.create(createTaskDto);
  }

  @Patch(':id')
  updateTask(@Param('id', ParseIntPipe) id: number, @Body() body: any): any {
    return this.tasksService.update(id, body);
  }

  @Delete(':id')
  deleteTask(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.delete(id);
  }
}
