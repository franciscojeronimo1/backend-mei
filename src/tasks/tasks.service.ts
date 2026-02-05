import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Task } from './entites/task.entitys.js';
import { PrismaService } from '../prisma/prisma.service.js';

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

  create(body: any) {
    const newId = this.tasks.length + 1;
    //eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newTask = {
      id: newId,
      ...body,
    };
    this.tasks.push(newTask);
    //eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return newTask;
  }

  update(id: number, body: any) {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);

    if (taskIndex < 0) {
      throw new HttpException('Tarefa não encontrada', HttpStatus.NOT_FOUND);
    }
    const taskItem = this.tasks[taskIndex];
    //eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.tasks[taskIndex] = {
      ...taskItem,
      ...body,
    };

    return this.tasks[taskIndex];
  }

  delete(id: number) {
    const taskIndex = this.tasks.findIndex((task) => task.id === Number(id));
    if (taskIndex < 0) {
      throw new HttpException('Tarefa não encontrada', HttpStatus.NOT_FOUND);
    }
    this.tasks.splice(taskIndex, 1);
    return {
      message: 'Tarefa deletada com sucesso',
    };
  }
}
