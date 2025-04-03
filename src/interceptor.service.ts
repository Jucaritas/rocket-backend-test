import { 
    Injectable, 
    NestInterceptor, 
    ExecutionContext, 
    CallHandler, 
    Logger 
  } from '@nestjs/common';
  import { Observable, throwError } from 'rxjs';
  import { tap, catchError } from 'rxjs/operators';
  
  @Injectable()
  export class InterceptorService implements NestInterceptor {
    private readonly logger = new Logger(InterceptorService.name);
  
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const req = context.switchToHttp().getRequest();
      const { method, url, body, params, query } = req;
      const userAgent = req.get('user-agent') || '';
      const startTime = Date.now();
  
      this.logger.log(
        // `Solicitud recibida - Método: ${method} URL: ${url} UserAgent: ${userAgent}`,
        `Solicitud recibida - Método: ${method} URL: ${url}`,
      );
      
      return next.handle().pipe(
        tap((data) => {
          const endTime = Date.now();
          const duration = endTime - startTime;
          
          this.logger.log(
            `Respuesta enviada - Método: ${method} URL: ${url} Duración: ${duration}ms Estado: 200`,
          );
        }),
        catchError((error) => {
          const endTime = Date.now();
          const duration = endTime - startTime;
          
          this.logger.error(
            `Error en solicitud - Método: ${method} URL: ${url} Duración: ${duration}ms`,
            error.stack,
          );
          
          this.logger.debug(
            `Detalles de solicitud con error - Body: ${JSON.stringify(body)} Params: ${JSON.stringify(params)} Query: ${JSON.stringify(query)}`,
          );
          
          return throwError(() => error);
        }),
      );
    }
}
