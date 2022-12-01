import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { autoLogin } from './features/auth/auth-store/actions';
import { AppState } from './store/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private store:Store<AppState>){}
  ngOnInit(): void {
    this.store.dispatch(autoLogin())
  }
}
