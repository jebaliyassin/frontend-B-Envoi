import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
  import { ToastrService } from 'ngx-toastr';
  import { DepotService }  from '../../service/depot.service';
  import { LdepotService }  from '../../service/ldepot.service';
  import { Depot}         from '../../model/depot';
  import { DatePipe }      from '@angular/common';
  import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
  import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
  from '@angular/forms';
@Component({
  selector: 'app-list-depot',
  templateUrl: './list-depot.component.html',
  styles: [
  ]
})
export class ListDepotComponent implements OnInit {

  
  list :any[];
  code : number = 0;
  SearchText :string;
  wcode : string;
  wlib  : string;
  wqte  : number;
  wqte1  : number;
  wpu   : number;
  wmont : number;
  p :number = 1;
  
  constructor( private service :DepotService,private router:Router,
    private toastr :ToastrService,public fb: FormBuilder ) { }

    ngOnInit() {
      this.getData();
  }
    
    getData() {
      this.service.getAll().subscribe(
        response =>{this.list = response;
          }
       );
    }
    
    addData()
    {
      this.router.navigate(['/depot']);
    }
  
    onDelete(id: number) {
      if (window.confirm('Are sure you want to delete this Depot ?')) {
      this.service.deleteData(id)
        .subscribe(
          data => {
            console.log(data);
            this.toastr.success(' data successfully deleted!'); 
            this.getData();
          },
          error => console.log(error));
    }
    }
    
    newdepot()
    {
      this.service.choixmenu = 'A'
      this.router.navigate(['/depot']);
    }
  }