import { Component, OnInit, signal } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppStateModel } from 'src/app/shared/store/Global/App.state';
import { loginuser } from 'src/app/shared/store/Login/login.actions';
import { selectLoginFailed } from 'src/app/shared/store/Login/login.selectors';

@Component({
  standalone: false,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private _store: Store<AppStateModel>) {}

  isErr = false;
  hide = signal(true);

  FC_login = new FormControl('', [Validators.required]);
  FC_password = new FormControl('', [Validators.required]);

  ngOnInit(): void {
    this._store.select(selectLoginFailed).subscribe((failed) => {
      this.isErr = failed;
    });
  }

  clickEvent(event: MouseEvent): void {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  ok(): void {
    if (!this.FC_login.valid || !this.FC_password.valid) {
      this.FC_login.markAsTouched();
      this.FC_password.markAsTouched();
      return;
    }

    this._store.dispatch(loginuser({
      username: this.FC_login.value!,
      password: this.FC_password.value!
    }));
  }
}
