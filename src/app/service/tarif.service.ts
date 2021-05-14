import { Injectable } from '@angular/core';
import { HttpClient , HttpRequest, HttpEvent} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Tarif} from '../model/tarif';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class TarifService {
  private baseUrl = '/api/tarifs';
  private baseUrl1='/api/tarifs/7';
  max :number=0;
  choixmenu : string  = "A";
  list : Tarif[];
  public formData:  FormGroup; 
  constructor(private http: HttpClient) { }

  getData(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
 
  createData(info: Object): Observable<Object> {
    alert("validation");
    return this.http.post(`${this.baseUrl}`, info);
  }
  
  updatedata(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }
 
  deleteData(id: number): Observable<any> {
   
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getAll(): Observable<any> {
   
    return this.http.get(`${this.baseUrl}`);
  }
  getNumero(){
    return this.http.get(`${this.baseUrl1}`);

  }

 nbreTarif(codec :string,typec : string ) {
  return this.http.get(`${this.baseUrl}/8/${codec}/${typec}`);
 
 }
 getMontant(poids : number ) {
  return this.http.get(`${this.baseUrl}/9/${poids}`);
 
 }
}

