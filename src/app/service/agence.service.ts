import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Agence} from '../model/agence';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class AgenceService {
 private baseUrl = '/api/agences';
  private baseUrll = '/api/agences/7';
  
  choixmenu: string = 'A';
  list : Agence[];
  public formData:  FormGroup; 
  constructor(private http: HttpClient) { }

  getData(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
 
  createData(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, info);
  }
  
  updatedata(id: string, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }
 
  deleteData(id:string): Observable<any> {
   
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getAll(): Observable<any> {
   
    return this.http.get(`${this.baseUrl}`);
  }
  getNumero(code : string) {
    return this.http.get(`${this.baseUrl}/7/${code}`);
  }
  listDirection(code: string): Observable<any> {
    console.log(code);
    return this.http.get(`${this.baseUrl}/5/${code}`);
  }

}
