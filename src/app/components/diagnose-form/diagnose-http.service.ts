import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
export interface Diagnose {
  blockName: string;
  blockNumber: string;
  chapterName: string;
  chapterNumber: null;
  code: string;
  id: number;
  isPublic: boolean;
  name: string;
  shortName: string;
}
@Injectable()
export class DiagnoseHttpService {
  private apiUrl = `http://localhost:3000/`;

  constructor(private http: HttpClient) {}

  getDiagnoses() {
    return this.http.get<Diagnose[]>(this.apiUrl);
  }

  search(searchTerm = 'Ост') {
    let params = new HttpParams();
    if (searchTerm) {
      params = params.set('Search', searchTerm);
    }

    return this.http.get<Diagnose[]>(this.apiUrl, { params });
  }
}
