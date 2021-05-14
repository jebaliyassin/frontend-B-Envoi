import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Chauffeur } from '../model/chauffeur';

@Injectable({
  providedIn: 'root'
})
export class ChauffeurService {

  private baseUrl='/api/chauffeurs';
  
  choixmenu : string ='A';
  list :Chauffeur [];
  public formData : FormGroup;
  constructor(private http : HttpClient) { }

  getData (id:string) : Observable<Object>{
    return this.http.get(`${this.baseUrl}/${id}`);
  }
 
  createData(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, info);
  }
  updatedata(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }
  deleteData(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text'});
  }
  getAll(): Observable<any> {
   
    return this.http.get(`${this.baseUrl}`);
  }
 
}