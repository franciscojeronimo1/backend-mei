import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Task } from './entites/task.entitys';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: 1,
      name: 'comprar pão',
      description: 'comprar pão',
      completed: false,
    },
  ];

  findAll() {
    return this.tasks;
  }

  findOne(id: string) {
    const task = this.tasks.find((task) => task.id === Number(id));
    if (task) return task;

    throw new HttpException('Tarefa não encontrada', HttpStatus.NOT_FOUND);
    //throw new NotFoundException('Tarefa não encontrada');
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

  update(id: string, body: any) {
    const taskIndex = this.tasks.findIndex((task) => task.id === Number(id));

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

  delete(id: string) {
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
