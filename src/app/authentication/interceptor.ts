import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {TokenService} from './token.service';
import {NEVER, Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';


export class Interceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    if (this.tokenService.token) {

      request = request.clone({
        setHeaders: {
          token: this.tokenService.token
        }
      });
    }

    return next.handle(request).pipe(
      map(event => {
        if (event instanceof HttpResponse) {
          const token = event.headers.get('token');
          if (token) {
            this.tokenService.token = token;
          }
        }
        return event;
      }),
      catchError(error => {
        console.error(error);
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            return NEVER;
          }
        }
        return throwError(error);
      })
    );


  }

}
