import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../service/client.service'
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators }
  from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from "@angular/material/dialog";
import { ParametreService } from '../../service/parametre.service';
@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',

})
export class AddClientComponent implements OnInit {
  num : any;
  par:  any={};
  code : string;
  get f() { return this.crudApi.formData.controls }
    constructor(public crudApi: ClientService, public fb: FormBuilder, public toastr: ToastrService,
      private router: Router,
      private parService:ParametreService,
      public dialogRef:MatDialogRef<AddClientComponent>) { }
      
      ngOnInit() {
        if (this.crudApi.choixmenu == "A") 
        { this.infoForm() };
        this.parService.getData(1).subscribe(
          response =>{
            this.par = response;
            this.f['code'].setValue(this.par.numc);
          }
        );
      }
      
    
      infoForm() {
        this.crudApi.formData = this.fb.group({
          id: null,
          code: ['', [Validators.required]],
          libelle: ['', [Validators.required]],
          adresse: ['', [Validators.required]],
          email: ['', [Validators.required]],
          tel: ['', [Validators.required]],
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
      this.router.navigate(['/clients']);
    }
    
      addData() {
        
        this.crudApi.createData(this.crudApi.formData.value).
          subscribe(data => {
            this.dialogRef.close();
            this.crudApi.getAll().subscribe(
              response =>{this.crudApi.list = response;}
             );
            this.router.navigate(['/clients']);
          });
      }
      updateData() {
        this.crudApi.updatedata(this.crudApi.formData.value.code, this.crudApi.formData.value).
          subscribe(data => {
            this.dialogRef.close();
            this.crudApi.getAll().subscribe(
              response =>{this.crudApi.list = response;}
             );
            this.router.navigate(['/clients']);
          });
      }
    
    
    }
    