import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { ClientService} from '../../service/client.service';
import { DestinationService} from '../../service/destination.service';
import { DepotService} from '../../service/depot.service';
import { LdepotService}from '../../service/ldepot.service';
import { Client}from '../../model/client';
import { Ldepot } from '../../model/ldepot';
import { DatePipe }from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute  } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { AddLdepotComponent } from '../../depot/add-ldepot/add-ldepot.component';
import { CposteService}  from '../../service/cposte.service';
import { Destination } from 'src/app/model/destination';
@Component({
  selector: 'app-add-depot',
  templateUrl: './add-depot.component.html',
  styleUrls: ['./add-depot.component.scss']
})
export class AddDepotComponent implements OnInit {

  clientList: Client[];
 destinationList: Destination[];
  collecte    : any={};
  isValid:boolean = true;
  client : any;
  Date ;
  compteur : any={};
  residence : any={};
  annee = 0;
  p :number  = 1;
  constructor(public service : DepotService,
     private dialog : MatDialog,public fb: FormBuilder,
    public lservice: LdepotService,
    public clientService : ClientService,
    public destinationService : DestinationService,
    private toastr :ToastrService,
    private router :Router,
    private currentRoute: ActivatedRoute,
    public cposteservice : CposteService,
    private datePipe : DatePipe) { }
    get f() { return this.service.formData.controls; }
    ngOnInit() {
      this.clientService.getAll().subscribe(
        response =>{this.clientList = response;
        },
       
        err => console.error(err), 
        () => console.log('getClients completed') 
       );
       this.destinationService.getAll().subscribe(
        response =>{this.destinationList = response;
        },);
      if (this.service.choixmenu == 'A'){
        this.infoForm();
        this.service.list = [];
        this.f['annee'].setValue(parseInt(localStorage.getItem('annee')));
        this.f['mat'].setValue(localStorage.getItem('mat'));
         this.f['code'].setValue(this.service.formData.value.code);
        this.annee = 2021;
    
        this.onSelectCompteur(this.annee);
       }
          else
        {
        alert(this.service.formData.value.codres);
        
         this.f['codres'].setValue(this.service.formData.value.codres);
         
        
        }

      
      }

     
  
      
    
      
     onSelectCompteur(id: number)
     {
       this.cposteservice.getData(id).subscribe(
        response =>{
          this.compteur = response;
          this.f['numero'].setValue(this.annee * 100000 + this.compteur.numdepot);
          }
       );  
     } 
infoForm() {
    this.service.formData = this.fb.group({
      id :null,
      annee : [0, [Validators.required]],
      numero : [0, [Validators.required]],
      date_depot : '',
      mat : [0, [Validators.required]],
     codedes : [0, [Validators.required]],
      total : [0, [Validators.required]],
      code : ['', [Validators.required]],
      lib_client : ['', [Validators.required]],
      sms: ['', [Validators.required]],
      destinataire: ['', [Validators.required]],
      ldepots :[],
      });
    } 
  
  ResetForm() {
      this.service.formData.reset();
  }
  
  AddData(bonIndex,Id){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    dialogConfig.data={bonIndex,Id};
    this.dialog.open(AddLdepotComponent, dialogConfig).afterClosed().subscribe(b10=>{
      this.calcul();
    });
  }

  onDelete(item : Ldepot,Id:number,i:number){
    if(Id != null)
    this.service.formData.value.id+=Id ;
   this.service.list.splice(i,1);
   this.calcul();
   }

  calcul(){
    
    
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
    this.f['ldepots'].setValue(this.service.list);
      this.service.createData(this.service.formData.value).
      subscribe( data => {
        this.toastr.success( 'Validation Faite avec Success'); 
      this.router.navigate(['/depots']);
      });
    }
    onSelectCli(ctrl)
    {
       if(ctrl.selectedIndex == 0){
        this.f['code'].setValue('');
       }
       else{
          this.f['code'].setValue(this.clientList[ctrl.selectedIndex - 1].code);
          
       }
     }
    
     onSelectDes(ctrl)
     {
        if(ctrl.selectedIndex == 0){
         this.f['codedes'].setValue('');
        }
        else{
           this.f['codedes'].setValue(this. destinationList[ctrl.selectedIndex - 1].code);
           
        }
      }

     transformDate(date){
     return this.datePipe.transform(date, 'yyyy-MM-dd');
   }
  }