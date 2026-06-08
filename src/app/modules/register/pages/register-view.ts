import { Component } from '@angular/core';
import { RegisterForm } from '../components/register-form/register-form';


@Component({
  selector: 'app-register-view',
  standalone: true,
  imports: [RegisterForm],
  templateUrl: './register-view.html',
  styleUrl: './register-view.css'
})
export class RegisterView { }
