import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {TokenService} from 'dgo-components';
import {NEVER, Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import {NotificationService} from '../shared/notification.service';


export class Interceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService, private notificationService: NotificationService) {

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
          const pdfs = event.headers.get('pdfs');
          if (pdfs !== null) {
            this.tokenService.visiblePdfs = pdfs.split(',');
          }

        }
        return event;
      }),
      catchError(error => {

        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this.notificationService.error('Bitte melden sie sich an um diese Funktion zu nutzen')
          } else if ( error.status === 500) {
            this.notificationService.error('Unerwarteter Fehler');
          } else if(error.status === 404) {
            this.notificationService.error(error.error);
          } else if(error.status === 0) {
            this.notificationService.error('Server nicht erreichbar');
          }
        }
        return throwError(error);
      })
    );


  }

}
