import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // HttpClient added
import { Observable } from 'rxjs'; // Use rxjs

@Injectable({
  providedIn: 'root'
})

export class DataService {

  apiUrl = `https://jsonplaceholder.typicode.com`;

  constructor(private http: HttpClient) { }

  // will return all the todos
  public getData(url: string, params?: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${url}`);
  }

  //

}
