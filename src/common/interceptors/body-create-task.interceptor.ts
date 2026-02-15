import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

export class BodyCreateTaskInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const {method, url, body} = request;
    console.log(`Request: [${method}] ${url}`);
    console.log(`Body: ${JSON.stringify(body)}`);
    return next.handle();
  }
}
