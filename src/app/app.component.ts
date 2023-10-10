import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiagnosisFormComponent } from './components/diagnosis-form/diagnosis-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DiagnosisFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}
