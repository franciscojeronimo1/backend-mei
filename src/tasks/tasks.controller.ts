import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { TasksService } from './tasks.service.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { PaginationDto } from '../common/dto/pagination.dto.js';
import { LoggerInterceptor } from '../common/interceptors/logger.interceptor.js';
import { BodyCreateTaskInterceptor } from '../common/interceptors/body-create-task.interceptor.js';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  @Get()
  @UseInterceptors(LoggerInterceptor)
  findAllTasks(@Query() paginationDto: PaginationDto) {
    return this.tasksService.findAll(paginationDto);
  }

  @Get(':id')
  getOneTask(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    return this.tasksService.findOne(id);
  }
  @Post()
  @UseInterceptors(BodyCreateTaskInterceptor)
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
