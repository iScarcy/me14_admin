import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
 
import { AppStateModel } from '../shared/store/Global/App.state';
import { Store } from '@ngrx/store';
import { loginSessionExpired, loginuserfaild, logoutuser } from '../shared/store/Login/login.actions';
import { MatDialog } from '@angular/material/dialog';
import { SessionExpiredDialogComponent } from '../components/session-expired/session-expired-dialog.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    private sessionExpiredDialogOpen = false;
    private sessionExpiredHandled = false;

    constructor(private _store: Store<AppStateModel>, private _dialog: MatDialog) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap(event => {
                if (request.url.includes('/SignIn') && event instanceof HttpResponse) {
                    this.sessionExpiredHandled = false;
                }
            }),
            catchError(err => {
                  
                const isSignInRequest = request.url.includes('/SignIn');
                if ([401, 403].includes(err.status)) {
                    if (isSignInRequest) {
                        this._store.dispatch(loginuserfaild());
                    } else if (!this.sessionExpiredHandled && !this.sessionExpiredDialogOpen) {
                        this.sessionExpiredDialogOpen = true;
                        this.sessionExpiredHandled = true;
                        this._dialog.open(SessionExpiredDialogComponent, {
                            disableClose: true,
                            width: '480px',
                            maxWidth: '92vw'
                        }).afterClosed().subscribe(() => {
                            this._store.dispatch(loginSessionExpired());
                            this.sessionExpiredDialogOpen = false;
                        });
                    }
                }
                if(err.url.includes("https://www.agescimessina14.org/fw/api/Gallery/album/") && err.status == 0 && err.statusText == "Unknown Error"){
                    this._store.dispatch(logoutuser())
                }
                
                if(isSignInRequest && err.error?.status == 500){
                     this._store.dispatch(loginuserfaild())
                }
               
                const error = err.error?.message || err.statusText;
                 
                return throwError(() => error);
            })
        );
    }
}
