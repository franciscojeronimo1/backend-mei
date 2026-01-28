import { Controller, Get } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
    @Get()
    getTasks() {
        return 'rota get tasks funcionando';
    }
}
