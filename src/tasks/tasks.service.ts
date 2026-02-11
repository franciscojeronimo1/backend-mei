import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Task } from './entites/task.entitys.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}
  private tasks: Task[] = [
    {
      id: 1,
      name: 'comprar pão',
      description: 'comprar pão',
      completed: false,
    },
  ];

  async findAll() {
    const allTasks = await this.prisma.task.findMany();
    return allTasks;
  }

  async findOne(id: number) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (task?.name) return task;

    throw new HttpException('Tarefa não encontrada', HttpStatus.NOT_FOUND);
  }

  async create(CreateTaskDto: CreateTaskDto) {
    const newTask = await this.prisma.task.create({
      data: {
        name: CreateTaskDto.name,
        description: CreateTaskDto.description,
        completed: false,
      },
    });
    return newTask;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const findTask = await this.prisma.task.findFirst({
      where: {
        id: id,
      },
    });
    if (!findTask) {
      throw new HttpException('Tarefa não encontrada', HttpStatus.NOT_FOUND);
    }

    const task = await this.prisma.task.update({
      where: {
        id: findTask.id,
      },
      data: updateTaskDto,
    });
    return task;
  }

  async delete(id: number) {
    const findTask = await this.prisma.task.findFirst({
      where: {
        id: id,
      },
    });
    if (!findTask) {
      throw new HttpException('Tarefa não encontrada', HttpStatus.NOT_FOUND);
    }
    await this.prisma.task.delete({
      where: {
        id: findTask.id,
      },
    });
    return { message: 'Tarefa deletada com sucesso' };
  }
}
