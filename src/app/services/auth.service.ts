import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";

import {IAuth, IToken} from "../interfaces";
import {urls} from "../configs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _accessTokenKey = 'access'
  private readonly _refreshTokenKey = 'refresh'
  private _authUser = new BehaviorSubject<string | null>(null)

  constructor(private httpClient: HttpClient) {
  }

  login(user: IAuth): Observable<IToken> {
    return this.httpClient.post<IToken>(urls.auth.login, user).pipe(
      tap((tokens) => {
        this._authUser.next(user.username)
        this._setTokens(tokens)
      })
    )
  }

  refresh(refresh: string): Observable<IToken> {
    return this.httpClient.post<IToken>(urls.auth.refresh, {refresh}).pipe(
      tap((tokens) => {
        this._setTokens(tokens)
      })
    )
  }

  getUserName(): Observable<string | null> {
    return this._authUser.asObservable()
  }

  private _setTokens({access, refresh}: IToken): void {
    localStorage.setItem(this._accessTokenKey, access)
    localStorage.setItem(this._refreshTokenKey, refresh)
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken()
  }

  getAccessToken(): string {
    return localStorage.getItem(this._accessTokenKey) || ''
  }

  getRefreshToken(): string {
    return localStorage.getItem(this._refreshTokenKey) || ''
  }

  deleteTokens(): void {
    localStorage.removeItem(this._accessTokenKey)
    localStorage.removeItem(this._refreshTokenKey)
    this._authUser.next(null)
  }

}
