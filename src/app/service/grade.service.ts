import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Grade} from '../model/grade';
import { FormGroup }
from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class GradeService {
  private baseUrl = '/api/grades';
 private baseUrl1 = '/api/grades/7';
 list : Grade[];
 choixmenu : string  = 'A';
 public dataForm:  FormGroup; 
  constructor(private http: HttpClient) { }
  getData(id: string): Observable<Object> 
  {return this.http.get(`${this.baseUrl}/${id}`);}
  
 getNum()
 { return this.http.get(`${this.baseUrl1}`);}
 createData(info: Object): Observable<Object> 
  {  return this.http.post(`${this.baseUrl}`, info);}
 updatedata(id:number, value: any): Observable<Object>
  { return this.http.put(`${this.baseUrl}/${id}`, value);}
  deleteData(id:number): Observable<any> 
  {  return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });}
 getAll(): Observable<any> 
 {  return this.http.get(`${this.baseUrl}`);}
   
 }
