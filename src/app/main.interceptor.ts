import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, switchMap, throwError} from 'rxjs';
import {AuthService} from "./services";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Injectable()
export class MainInterceptor implements HttpInterceptor {

  isRefreshing = false;

  constructor(
    private authService: AuthService,
    private matDialog: MatDialog,
    private router: Router) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isAuthenticated = this.authService.isAuthenticated();

    if (isAuthenticated) {
      request = this.addToken(request, this.authService.getAccessToken())
    }

    return next.handle(request).pipe(
      catchError((res: HttpErrorResponse) => {

        if (res && res.error && res.status === 401) {
          this.handle401Error(request, next)
        }

        return throwError(() => res)
      })
    );
  }

  addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {Authorization: `Bearer ${token}`}
    })
  }

  handle401Error(request: HttpRequest<any>, next: HttpHandler): any {

    const refresh = this.authService.getRefreshToken();

    if (refresh && !this.isRefreshing) {
      this.isRefreshing = true;
      return this.authService.refresh(refresh).pipe(
        switchMap((token) => {
          this.isRefreshing = false;
          return next.handle(this.addToken(request, token.access))
        }),
        catchError(() => {
          this.isRefreshing = false
          this.authService.deleteTokens()
          this.matDialog.closeAll()
          this.router.navigate(['/login'])
          return throwError(() => new Error('token is invalid or expired'))
        })
      )
    }

  }

}

