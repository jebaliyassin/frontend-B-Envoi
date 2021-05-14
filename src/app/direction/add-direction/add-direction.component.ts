import { Component, OnInit,Inject} from '@angular/core';
import { DirectionService} from '../../service/direction.service'
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { Router } from '@angular/router';
import { Direction} from '../../model/Direction';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-add-direction',
  templateUrl: './add-direction.component.html',
  styles: [
  ]
})
export class AddDirectionComponent implements OnInit {

  submitted = false;
   constructor(public crudApi: DirectionService ,public fb: FormBuilder,public toastr: ToastrService,
      private router : Router,@Inject(MAT_DIALOG_DATA)  public data,
      public dialogRef:MatDialogRef<AddDirectionComponent>,
      ) { }
  
    ngOnInit() {
      if (this.crudApi.choixmenu == 1)
      {this.infoForm()};
     }
    infoForm() {
      this.crudApi.formData = this.fb.group({
          id: null,
          code: ['', [Validators.required]],
          libelle: ['', [Validators.required]],
        });
      }
    get f() { return this.crudApi.formData.controls; }

    onReset() {
        this.crudApi.formData.reset();
    }

    onSubmit() {
      this.submitted = true;
      if (this.crudApi.formData.invalid) {
            return;
     }
      if (this.crudApi.choixmenu == 1)
      {
        this.addData();
      }
      else
      {
       this.updateData()
      }
 }
  
  addData() {
    this.crudApi.createData(this.crudApi.formData.value).
    subscribe( data => {
      this.dialogRef.close();  
      this.crudApi.getAll().subscribe(
        response =>{this.crudApi.list = response;}
       );
      this.router.navigate(['/directions']); 
    });
  }
    updateData()
    {
      this.crudApi.updatedata(this.crudApi.formData.value.id, this.crudApi.formData.value).
      subscribe( data => {
        this.dialogRef.close();
     
        this.crudApi.getAll().subscribe(
          response =>{this.crudApi.list = response;}
         );
        this.router.navigate(['/directions']);
      });
    }
  
  }
  
