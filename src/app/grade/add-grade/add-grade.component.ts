import { Component, OnInit } from '@angular/core';
import { GradeService } from 'src/app/Service/grade.service';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }from '@angular/forms';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDialogRef } from "@angular/material/dialog";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-grade',
  templateUrl: './add-grade.component.html',
  styles: [
  ]
})
export class AddGradeComponent implements OnInit {

  get f() { return this.gradeService.dataForm.controls }
  num :any;
  code:string ;
  constructor(public gradeService:GradeService,public fb: FormBuilder,
    public toastr: ToastrService,
    private router : Router,
    public dialogRef:MatDialogRef<AddGradeComponent>,)  { }
   
  ngOnInit(): void {
    if (this.gradeService.choixmenu == "A") 
    { this.infoForm() 
    this.onSelectCode()};
  }

  onSelectCode() {
    
    this.gradeService.getNum().subscribe(
      response => {
      
        this.num = response;
        this.code = (1000 + this.num +1).toString().substring(1);
      
        this.f['code'].setValue(this.code);
      }
    );
  }

  infoForm() {
    this.gradeService.dataForm= this.fb.group({
      id: null,
      code: ['', [Validators.required]],
      libelle: ['', [Validators.required]],
    });
  }
  ResetForm() {
    this.gradeService.dataForm.reset();
  }
  onSubmit() {
   
      if (this.gradeService.choixmenu == "A") {
        this.addData();
      }
      else {
  
        this.updateData()
      }
  
  
  }

lister()
{
  this.router.navigate(['/grades']);
}

  addData() {
    
    this.gradeService.createData(this.gradeService.dataForm.value).
      subscribe(data => {
        this.dialogRef.close();
        this.gradeService.getAll().subscribe(
          response =>{this.gradeService.list = response;}
         );
        this.router.navigate(['/grades']);
      });
  }
  updateData() {
    this.gradeService.updatedata(this.gradeService.dataForm.value.id, this.gradeService.dataForm.value).
      subscribe(data => {
        this.dialogRef.close();
        this.gradeService.getAll().subscribe(
          response =>{this.gradeService.list = response;}
         );
        this.router.navigate(['/grades']);
      });
  }

}
