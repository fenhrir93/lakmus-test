import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Diagnosis } from 'src/app/models/Diagnosis.interface';

@Injectable()
export class DiagnosisHttpService {
  private apiUrl = `http://localhost:3000/`;

  constructor(private http: HttpClient) {}

  getDiagnoses() {
    return this.http.get<Diagnosis[]>(this.apiUrl);
  }

  search(_searchTerm = 'Ост') {
    let params = new HttpParams();
    params = params.set('Search', _searchTerm);

    return this.http.get<Diagnosis[]>(this.apiUrl, { params });
  }
}
