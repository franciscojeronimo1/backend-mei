import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  findAll() {
    return [{ id: 1, task: 'comprar pão' }];
  }

  findOne(id: string) {
    return 'Buscar tarefa com id: ' + id;
  }

  create(body: any): any {
    return body;
  }
}
