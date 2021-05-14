import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators }
  from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chauffeur } from 'src/app/model/chauffeur';
import { ChauffeurService } from 'src/app/service/chauffeur.service';
import {Direction} from 'src/app/model/direction';
import{DirectionService} from 'src/app/service/direction.service';
@Component({
  selector: 'app-add-chauffeur',
  templateUrl: './add-chauffeur.component.html',
})
export class AddChauffeurComponent implements OnInit {
DirectionList : Direction[];
  num : any;
  code : string;
    constructor(public crudApi: ChauffeurService, public fb: FormBuilder, public toastr: ToastrService,
      public directionService:DirectionService,
      private router: Router,public dialogRef:MatDialogRef<AddChauffeurComponent>) { }
     
      get f() { return this.crudApi.formData.controls }
      ngOnInit() {
        if (this.crudApi.choixmenu == "A") 
        { this.infoForm() };
        this.directionService.getAll().subscribe(
          response =>{this.DirectionList = response ;} 
         ); 
       }

    
      infoForm() {
        this.crudApi.formData = this.fb.group({
          id: null,
          mat: ['', [Validators.required]],
          nom: ['', [Validators.required]],
          libelle: ['', [Validators.required]],
          grade: ['', [Validators.required]],
          destination: ['', [Validators.required]],
          tel: ['', [Validators.required]],
          agence: ['', [Validators.required]],
          direction: ['', [Validators.required]],
          email: ['', [Validators.required]],
          login: ['', [Validators.required]],
          pwd: ['', [Validators.required]],
        });
      }
      ResetForm() {
        this.crudApi.formData.reset();
      }
      onSubmit() {
       
          if (this.crudApi.choixmenu == "A") {
            this.addData();
          }
          else {
      
            this.updateData()
          }
      
      
      }
    
    lister()
    {
      this.router.navigate(['/chauffeurs']);
    }
    
      addData() {
        
        this.crudApi.createData(this.crudApi.formData.value).
          subscribe(data => {
            this.dialogRef.close();
            this.crudApi.getAll().subscribe(
              response =>{this.crudApi.list = response;}
             );
            this.router.navigate(['/chauffeurs']);
          });
      }
      updateData() {
        this.crudApi.updatedata(this.crudApi.formData.value.id, this.crudApi.formData.value).
          subscribe(data => {
            this.dialogRef.close();
            this.crudApi.getAll().subscribe(
              response =>{this.crudApi.list = response;}
             );
            this.router.navigate(['/chauffeurs']);
          });
      }
    
    
    }
    