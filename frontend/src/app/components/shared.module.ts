import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginComponent } from './modals/login/login.component';
import { RegisterComponent } from './modals/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [RegisterComponent, LoginComponent],
})
export class SharedModule {}
