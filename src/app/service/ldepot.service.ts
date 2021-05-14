import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Ldepot } from '../model/ldepot';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class LdepotService {

  private baseUrl = '/api/ldepots';
  public formData:  FormGroup; 
  list : Ldepot[] = [];
  constructor(private http:HttpClient,private toastr: ToastrService) { }
  choixmenu : string= 'A';


  
 
  saveOrUpdate(info: Object): Observable<Object> {2
  
    return this.http.post(`${this.baseUrl}`, info);
  }
  updatedata(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteData(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getAll(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }


}
