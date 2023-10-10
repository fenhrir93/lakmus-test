import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  take,
  takeUntil,
} from 'rxjs';
import { DiagnosisHttpService } from '../diagnosis-http.service';
import { HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Diagnosis } from 'src/app/models/Diagnosis.interface';

@Component({
  selector: 'app-diagnose-field',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
  ],
  templateUrl: './diagnosis-field.component.html',
  styleUrls: ['./diagnosis-field.component.css'],
  providers: [HttpClientModule, DiagnosisHttpService],
})
export class DiagnosisFieldComponent implements OnInit, OnDestroy {
  @Input() group = new FormGroup({});

  diagnosis$ = new Subject<Diagnosis[]>();
  private destroyed$ = new Subject<void>();
  private searchInputSubject = new Subject<string>();

  constructor(private diagnoseHttpService: DiagnosisHttpService) {}

  ngOnInit(): void {
    this.setDiagnoses();
    this.initSearch();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  search(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    if (!value) {
      return;
    }
    this.searchInputSubject.next(value);
  }

  getOptionName(option: { name: string }): string {
    return option ? option.name : '';
  }

  trackByFn(_index: number, item: { id: number | string }) {
    return item.id;
  }

  private initSearch() {
    this.searchInputSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((value: string) => {
          this.searchInputSubject.next(value);
          return this.diagnoseHttpService.search(value);
        }),
        takeUntil(this.destroyed$)
      )
      .subscribe((data) => {
        this.diagnosis$.next(data);
      });
  }

  private setDiagnoses() {
    this.diagnoseHttpService
      .getDiagnoses()
      .pipe(take(1))
      .subscribe((diagnoses) => this.diagnosis$.next(diagnoses));
  }
}
