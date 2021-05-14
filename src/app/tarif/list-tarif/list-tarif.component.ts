import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TarifService }  from '../../service/tarif.service';
import { Tarif }         from '../../model/tarif';
import { DatePipe }      from '@angular/common';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
@Component({
  selector: 'app-list-tarif',
  templateUrl: './list-tarif.component.html',
  
})
export class ListTarifComponent implements OnInit {

  list : Tarif[];
  code : number = 0;
  SearchText :string;
  wcode : string;
  wlib  : string;
  wqte  : number;
  wqte1  : number;
  wpu   : number;
  wmont : number;
  p :number = 1;
  
  constructor( private service :TarifService,private router:Router,
    private toastr :ToastrService,public fb: FormBuilder,
    private datePipe : DatePipe,
  
    ) { }

    ngOnInit() {
      this.getData();
     }
    
    getData() {
      this.service.getAll().subscribe(
        response =>{this.list = response;
          }
       );
    }
    onDelete(id: number) {
      if (window.confirm('Are sure you want to delete this tarif ?')) {
        this.service.deleteData(id)
          .subscribe(
            data => {
              console.log(data);
              this.toastr.warning(' data successfully deleted!');
              this.getData();
            },
            error => console.log(error));
      }
    }
    
    newtarif()
    {
      this.service.choixmenu = "A"
      this.router.navigate(['/tarif']);
    }

   

    onSelect(item : Tarif) {
      this.service.choixmenu = "A";
     this.service.formData = this.fb.group(Object.assign({},item));
   
      this.router.navigate(['/tarif']);
    }

  
}



