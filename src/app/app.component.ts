import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AppStateModel } from './shared/store/Global/App.state';
import { Store } from '@ngrx/store';
import { selectIsLogged } from './shared/store/Login/login.selectors';
import { filter } from 'rxjs';

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  private isLogged: boolean | undefined;

  constructor(private _router: Router, private _store: Store<AppStateModel>) {}

ngOnInit(): void {
  this._router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd)
  ).subscribe(() => this.redirectForAuthentication());

  this._store.select(selectIsLogged).subscribe((isLogged) => {
    this.isLogged = isLogged;
    this.redirectForAuthentication();
  });
}

private redirectForAuthentication(): void {
  if (this.isLogged === undefined) return;

  const onLoginPage = this._router.url.split('?')[0] === '/login';
  if (!this.isLogged && !onLoginPage) {
    this._router.navigateByUrl('/login');
  } else if (this.isLogged && onLoginPage) {
    this._router.navigateByUrl('/');
  }
}



  title = 'Messina14 Admin Page';
}
