import { Component, OnInit,Inject } from '@angular/core';
import { AgenceService} from '../../service/agence.service'
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { Router } from '@angular/router';
import { Direction} from '../../model/direction';
import { Agence} from '../../model/agence';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDialogRef } from "@angular/material/dialog";
import { DirectionService} from '../../service/direction.service'
@Component({
  selector: 'app-add-agence',
  templateUrl: './add-agence.component.html',
  styles: [
  ]
})
export class AddAgenceComponent implements OnInit {
  DirectionList:Direction[];

  num:any;
  code :string;
    submitted = false;
    constructor(public crudApi: AgenceService ,public fb: FormBuilder,public toastr: ToastrService,public directionService: DirectionService,
       private router : Router,@Inject(MAT_DIALOG_DATA)  public data,
       public dialogRef:MatDialogRef<AddAgenceComponent>,
       ) { }
   
       get f() { return this.crudApi.formData.controls }
       ngOnInit() {
       
         if (this.crudApi.choixmenu == "A")
         {
           this.infoForm() 
           
           
         }
        
         this.directionService.getAll().subscribe(
           response =>{this.DirectionList = response;}
          );
        }
       
        
         
       
       
       
       infoForm() {
         this.crudApi.formData = this.fb.group({
             id: null,
             codedir: ['', [Validators.required]],
             code: ['', [Validators.required]],
             libelle: ['', [Validators.required]],
             libdir: ['', [Validators.required]],
            
           });
         }
       
       
       
       ResetForm() {
           this.crudApi.formData.reset();
       }
       onSubmit() {
       
         if (this.crudApi.choixmenu == "A")
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
         this.router.navigate(['/agences']);
       });
       }
       updateData()
       {
         this.crudApi.updatedata(this.crudApi.formData.value.code,this.crudApi.formData.value).
         subscribe( data => {
           this.dialogRef.close();
       
           this.crudApi.getAll().subscribe(
             response =>{this.crudApi.list = response;}
            );
           this.router.navigate(['/agences']);
         });
       }
       
       OnSelectDirection(ctrl) {
         if (ctrl.selectedIndex == 0) {
       
           this.f['codedir'].setValue('');
         }
         else {
           this.code = this.DirectionList[ctrl.selectedIndex - 1].code
           ;
           this.crudApi.getNumero(this.code).subscribe(
             response => {
             
               this.num = response;
               if (this.num > 0)
               {
                 this.code = (100000 + this.num +1).toString().substring(1);
               }
               else
               {
                 this.code = (this.code+'01');
               }
             
               this.f['code'].setValue(this.code);
             }
           );
         
         }
         
        
      }
       }
    
  