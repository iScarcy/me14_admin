import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
 
import { AppStateModel } from '../shared/store/Global/App.state';
import { Store } from '@ngrx/store';
import { loginuserfaild } from '../shared/store/Login/login.actions';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private _store: Store<AppStateModel>) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError(err => {
                 
                if ([401, 403].includes(err.status) ) {
                    // Automatically log out if a 401 or 403 response is returned from the API
                    this._store.dispatch(loginuserfaild())
                }
                const error = err.error?.message || err.statusText;
                console.error(err);
                return throwError(() => error);
            })
        );
    }
}