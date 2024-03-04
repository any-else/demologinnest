import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class GetListInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    // trước khi vào xử lý cái gì đó
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    // trước khi ra làm gì đó
    return next.handle().pipe(
      map((data) =>
        data.map((item) => {
          const { password, user_id, ...rest } = item;
          return rest;
        }),
      ),
    );
  }
}
