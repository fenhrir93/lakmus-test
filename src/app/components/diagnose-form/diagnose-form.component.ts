import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Diagnose, DiagnoseHttpService } from './diagnose-http.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DiagnoseSequelizeService } from './diagnoseSequelize.service';
import { HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Subject } from 'rxjs';
import { DiagnoseFieldComponent } from './diagnose-field/diagnose-field.component';

export interface Condition {
  condition: Diagnose;
  notes: string;
}

export interface Data {
  conditions: Condition[];
  date: string;
}

@Component({
  selector: 'app-diagnose-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    MatAutocompleteModule,
    DiagnoseFieldComponent,
  ],
  templateUrl: './diagnose-form.component.html',
  styleUrls: ['./diagnose-form.component.css'],
  providers: [DiagnoseSequelizeService],
})
export class DiagnoseFormComponent implements OnInit {
  conditionsFormGroup = this.fB.array<FormGroup>([]);
  formGroup = this.fB.group({
    date: '',
    conditions: this.conditionsFormGroup,
  });
  data = new FormControl('');

  readonly minDate = new Date();

  diagnoses$ = new Subject<Diagnose[]>();

  constructor(
    private fB: FormBuilder,
    private sequelizer: DiagnoseSequelizeService
  ) {}

  ngOnInit(): void {
    this.addField();
  }

  addField() {
    const newFormGroup = this.fB.group({
      condition: [],
      notes: '',
    });
    this.conditionsFormGroup.push(newFormGroup);
  }

  onSubmit() {
    const data: Data = {
      date: this.formGroup.value.date,
      conditions: this.formGroup.value.conditions,
    };
    this.data.setValue(JSON.stringify(this.sequelizer.sequelizeData(data)));
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.name === o2.name && o1.id === o2.id;
  }

  trackByFn(index, item) {
    return item.id;
  }

  getOptionName(option: any): string {
    return option ? option.name : '';
  }
}
