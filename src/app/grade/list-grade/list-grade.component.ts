import { Component, OnInit ,Inject} from '@angular/core';

import { Grade } from 'src/app/model/grade';
import { GradeService } from 'src/app/Service/grade.service';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddGradeComponent } from '../add-grade/add-grade.component';
import { MatDialogRef } from "@angular/material/dialog";
@Component({
  selector: 'app-list-grade',
  templateUrl: './list-grade.component.html',
  styles: [
  ]
})
export class ListGradeComponent implements OnInit {

  grade : Grade;
  control: FormControl = new FormControl('');
  p: number = 1;
  constructor(public gradeS: GradeService, public toastr: ToastrService,
    private router : Router,public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<AddGradeComponent>,) { }
    ngOnInit(): void {
      this.getData();
    }
    getData() {
      this.gradeS.getAll().subscribe(
         response =>{
          
           this.gradeS.list = response;}
        );
      
     }
     addGrade()
  {
    this.gradeS.choixmenu = "A";
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true;
      dialogConfig.width="50%";
      this.matDialog.open(AddGradeComponent, dialogConfig);
    }
    removeData(id:number) {
      if (window.confirm('Are sure you want to delete this Grade?')) {
        this.gradeS.deleteData(id)
          .subscribe(
            data => {
              console.log(data);
              this.toastr.warning(' data successfully deleted!');
              this.getData();
            },
            error => console.log(error));
      }
    }
    selectData(item : Grade) {
      this.gradeS.choixmenu = "M";
      this.gradeS.dataForm = this.fb.group(Object.assign({},item));
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true;
      dialogConfig.width="50%";
      
      this.matDialog.open(AddGradeComponent, dialogConfig);
    }
  }
