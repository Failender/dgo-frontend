import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {TokenService} from './token.service';
import {NEVER, Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';


export class Interceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService, private snackbar: MatSnackBar) {

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
          const permissions = event.headers.get('permissions');
          if (permissions) {
            this.tokenService.permissions = permissions.split(',');
          }
        }
        return event;
      }),
      catchError(error => {
        console.error(error);
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this.snackbar.open('Bitte melden sie sich an um diese Funktion zu nutzen')
            return NEVER;
          } else if( error.status === 500) {
            this.snackbar.open('Unerwarteter Fehler');
          }
        }
        return throwError(error);
      })
    );


  }

}
