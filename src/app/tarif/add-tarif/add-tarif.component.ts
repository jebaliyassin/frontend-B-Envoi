import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { DestinationService} from '../../service/destination.service';
import { TypecourrierService} from '../../service/typecourrier.service';
import { TarifService}     from '../../service/tarif.service';
import { Tarif}        from '../../model/tarif';
import { Destination}          from '../../model/destination';
import { Typecourrier}          from '../../model/typecourrier';
import { NgForm }          from '@angular/forms';
import { ToastrService }   from 'ngx-toastr';
import { Router, ActivatedRoute  } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { AddLtarifComponent } from '../../tarif/add-ltarif/add-ltarif.component';
//import { Cposte} from '../../model/cposte';
//import { CposteService}  from '../../service/cposte.service';
import { Observable } from "rxjs";
@Component({
  selector: 'app-add-tarif',
  templateUrl: './add-tarif.component.html',
  styleUrls: ['./add-tarif.component.scss']
})
export class AddTarifComponent implements OnInit {
 
  num :any;
  code:string ;
  typecourrierList : Typecourrier[];
  destinationList: Destination[];
    tarif    : any={};
    isValid:boolean = true;
    destination : any;
    typecourrier :any;
    compteur : any={};
    annee = 0;
    nbrTarif  :any;
    p :number  = 1;
    valid = true;
    constructor(public service:TarifService,
      private dialog:MatDialog,public fb: FormBuilder,
      public destinationService : DestinationService,
      public   typecourrierService :   TypecourrierService,
      private toastr :ToastrService,
      private router :Router,
      private currentRoute: ActivatedRoute,
     // public cposteservice : CposteService
      ) { }
      get f() { return this.service.formData.controls; }
      ngOnInit() {
        this.destinationService.getAll().subscribe(
          response =>{this.destinationList = response;
          },
          err => console.error(err), 
          () => console.log('getDestinations completed') 
         );
         this.typecourrierService.getAll().subscribe(
          response =>{this.typecourrierList = response;}
         );
        if (this.service.choixmenu == 'A'){
         {
          this.infoForm();
          this.onSelectCode()}
          this.service.list = [];
          }
            else
          {
          this.f['code'].setValue(this.service.formData.value.code);
           
           this.tarif.getAll(this.service.formData.value.numero).subscribe(
           response =>{this.service.list = response});
          }
  
        
        }
        onSelectCode() {
    
          this.service.getNumero().subscribe(
            response => {
            
              this.num = response;
              this.code = (1000 + this.num +1).toString().substring(1);
            
              this.f['code'].setValue(this.code);
            }
          );
        }
  infoForm() {
      this.service.formData = this.fb.group({
         id :null,
         code : [0, [Validators.required]],
         codedes : [0, [Validators.required]],
         typecourrier : [0, [Validators.required]],
         ltarifs :[],
         
        });
      } 
    
    ResetForm() {
        this.service.formData.reset();
    }
    
    AddData(tarifIndex,Id){
      if (this.valid )
      {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.disableClose = true;
        dialogConfig.width="50%";
        dialogConfig.data={tarifIndex,Id};
        this.dialog.open(AddLtarifComponent, dialogConfig);
      } 
      else
      {
        this.toastr.success( 'Tarif deja saisie'); 
      }
    }
  
    onDelete(item : Tarif,Id:number,i:number){
      if(Id != null)
      this.service.formData.value.id+=Id ;
     this.service.list.splice(i,1);
     }
  
    
  
  validateForm(){
       this.isValid = true ;
      if(this.service.formData.value.id_client==0)
       this.isValid =false;
       else if (this.service.list.length==0)
       this.isValid =false;
       return this.isValid;
     }
  
    onSubmit(){
      alert(this.service.formData.value.code);
      this.service.formData.value.ltarifs = this.service.list;
      alert(this.service.list);
      alert(this.service.formData.value);
        this.service.createData(this.service.formData.value).
        subscribe( data => {
          this.toastr.success( 'Validation Faite avec Success'); 
         this.router.navigate(['/tarifs']);
        });
      }
   
    
      
   
     nbreTarif(){
      const val = this.service.formData.value ;
      
      this.service.nbreTarif(val.codec,val.typec).subscribe(
         res =>{
         this.nbrTarif = res;
         });
         if (this.nbrTarif == 0 )
      {
        this.toastr.success( 'Tarif deja saisie'); 
        this.valid = false;
      }
     }
    }

   
  
  
  
