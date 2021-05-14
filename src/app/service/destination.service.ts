import { Injectable } from '@angular/core';
import { HttpClient , HttpRequest, HttpEvent} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Destination} from '../model/destination';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class DestinationService {
  
  private baseUrl='/api/destinations';
  private baseUrl1='/api/destinations/7';
  choixmenu : string ='A';
  list :Destination [];
  public formData : FormGroup;
  constructor(private http : HttpClient) { }

  getData (id:string) : Observable<Object>{
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  getNumero(){
    return this.http.get(`${this.baseUrl1}`);

  }
  createData(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, info);
  }
  updatedata(id: string, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }
  deleteData(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text'});
  }
  getAll(): Observable<any> {
   
    return this.http.get(`${this.baseUrl}`);
  }
 
}
