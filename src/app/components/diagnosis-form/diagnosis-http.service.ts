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

  search(searchTerm = 'Ост') {
    let params = new HttpParams();
    if (searchTerm) {
      params = params.set('Search', searchTerm);
    }

    return this.http.get<Diagnosis[]>(this.apiUrl, { params });
  }
}
