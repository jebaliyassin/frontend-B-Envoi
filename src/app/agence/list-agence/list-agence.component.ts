import { Component, OnInit,Inject } from '@angular/core';
import { AgenceService} from '../../service/agence.service';
import { ToastrService } from 'ngx-toastr';
import { Agence} from '../../model/agence';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AddAgenceComponent } from '../../agence/add-agence/add-agence.component';
@Component({
  selector: 'app-list-agence',
  templateUrl: './list-agence.component.html',
  styles: [
  ]
})
export class ListAgenceComponent implements OnInit {
  Agence: Agence;
  p: number = 1;
    
    control: FormControl = new FormControl('');
    constructor(public crudApi:AgenceService, public toastr: ToastrService,
      private router : Router,public fb: FormBuilder,
      private matDialog: MatDialog,
      @Inject(MAT_DIALOG_DATA) public data: any,
      public dialogRef:MatDialogRef<AddAgenceComponent>,) { }
   
    ngOnInit() {
      
      this.getData();
    }
    addagence()
    {
      
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true;
      dialogConfig.width="50%";
      //dialogConfig.data="gdddd";
      this.matDialog.open(AddAgenceComponent, dialogConfig);
    }
   
    
  
    
    getData() {
      this.crudApi.getAll().subscribe(
        response =>{this.crudApi.list = response;}
       );
     
    }
    
   
    removeData(code:string ) {
      if (window.confirm('Are sure you want to delete this Article ?')) {
      this.crudApi.deleteData(code)
        .subscribe(
          data => {
            console.log(data);
            this.toastr.warning(' data successfully deleted!'); 
            this.getData();
          },
          error => console.log(error));
    }
    }
    selectData(item : Agence) {
      this.crudApi.choixmenu = "M";
      this.crudApi.formData= this.fb.group(Object.assign({},item));
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true;
      dialogConfig.width="50%";
      
      this.matDialog.open(AddAgenceComponent, dialogConfig);
    }

}
