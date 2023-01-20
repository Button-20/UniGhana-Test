import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    public authService: AuthService,

    private router: Router
  ) {}

  ngOnInit() {
    this.getUserDetails();
  }

  async getUserDetails() {
    await this.authService.getUserDetails();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
