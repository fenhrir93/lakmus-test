import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiagnoseFormComponent } from './components/diagnose-form/diagnose-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DiagnoseFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}
