import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  @Get()
  findAllTasks() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  getOneTask(@Param('id') id: string) {
    console.log(id);
    return this.tasksService.findOne(id);
  }
  @Post()
  createTask(@Body() body: any): any {
    console.log(body);
    return this.tasksService.create(body);
  }

  @Patch(':id')
  updateTask(@Param('id') id: string, @Body() body: any): any {
    console.log(id);
    console.log(body);
    return 'atualizando tarefa';
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    console.log('id enviado: ', id);
    return 'deletando tarefa';
  }
}
