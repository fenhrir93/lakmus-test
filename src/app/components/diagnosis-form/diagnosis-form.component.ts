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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DiagnoseSequelizeService as DiagnosisSequelizeService } from './diagnosisSequelize.service';
import { HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Subject } from 'rxjs';
import { DiagnosisFieldComponent } from './diagnosis-field/diagnosis-field.component';
import { Diagnosis } from 'src/app/models/Diagnosis.interface';
import { ConditionData } from 'src/app/models/ConditionData.itnerface';

@Component({
  selector: 'app-diagnosis-form',
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
    DiagnosisFieldComponent,
  ],
  templateUrl: './diagnosis-form.component.html',
  styleUrls: ['./diagnosis-form.component.css'],
  providers: [DiagnosisSequelizeService],
})
export class DiagnosisFormComponent implements OnInit {
  conditionsFormGroup = this.fB.array<FormGroup>([]);
  formGroup = this.fB.group({
    date: '',
    conditions: this.conditionsFormGroup,
  });
  data = new FormControl('');

  readonly minDate = new Date();

  diagnoses$ = new Subject<Diagnosis[]>();

  constructor(
    private fB: FormBuilder,
    private sequelizer: DiagnosisSequelizeService
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
    const { date, conditions } = this.formGroup.value;
    const data: ConditionData = {
      date,
      conditions,
    };
    this.data.setValue(JSON.stringify(this.sequelizer.sequelizeData(data)));
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.name === o2.name && o1.id === o2.id;
  }

  trackByFn(_index: number, item: { id: number | string }) {
    return item.id;
  }

  getOptionName(option: any): string {
    return option ? option.name : '';
  }
}
