import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { autoLogout } from 'src/app/features/auth/auth-store/actions';
import { getConnectedStatus, isAuthenticated } from 'src/app/features/auth/auth-store/selectors';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  isAuthentificated: boolean;

  constructor(private store: Store<AppState>,
    private router: Router) {


  }

  ngOnInit(): void {
    this.isAuthentificated = localStorage.getItem('userData') ? true : false;

  }
  onLogout = (e: MouseEvent) => {
    this.store.dispatch(autoLogout());
    this.store.select(getConnectedStatus).subscribe((isConnected: boolean) => {
      console.log('isConnected', isConnected);
      this.isAuthentificated = isConnected;
    });
  };


}
