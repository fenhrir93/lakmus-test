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
import { Diagnose, DiagnoseHttpService } from '../diagnose-http.service';
import { HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

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
  templateUrl: './diagnose-field.component.html',
  styleUrls: ['./diagnose-field.component.css'],
  providers: [HttpClientModule, DiagnoseHttpService],
})
export class DiagnoseFieldComponent implements OnInit, OnDestroy {
  @Input() group: FormGroup;

  diagnoses$ = new Subject<Diagnose[]>();
  private destroyed$ = new Subject<void>();
  private searchInputSubject = new Subject<string>();

  constructor(private diagnoseHttpService: DiagnoseHttpService) {}

  ngOnInit(): void {
    this.setDiagnoses();
    this.initSearch();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  search(value: string) {
    this.searchInputSubject.next(value);
  }

  getOptionName(option: any): string {
    return option ? option.name : '';
  }

  trackByFn(index, item) {
    return item.id;
  }

  private initSearch() {
    this.searchInputSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((value: string) => {
          this.search(value);
          return this.diagnoseHttpService.search(value);
        }),
        takeUntil(this.destroyed$)
      )
      .subscribe((data) => {
        this.diagnoses$.next(data);
      });
  }

  private setDiagnoses() {
    this.diagnoseHttpService
      .getDiagnoses()
      .pipe(take(1))
      .subscribe((diagnoses) => this.diagnoses$.next(diagnoses));
  }
}
