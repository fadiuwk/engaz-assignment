import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpErrorResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HandleErrorInterceptor implements HttpInterceptor {
  constructor(private _ToastrService: ToastrService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 500) {
          this._ToastrService.error('An error occurred. Please try again.');
        }
        return throwError(error);
      })
    );
  }
}
