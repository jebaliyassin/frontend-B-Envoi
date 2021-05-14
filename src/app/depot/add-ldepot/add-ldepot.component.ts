import { Component, OnInit,Inject } from '@angular/core';
import { Destination } from '../../model/destination';

import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { DestinationService } from '../../service/destination.service';
import { NgForm } from '@angular/forms';
import { Ldepot } from '../../model/ldepot';
import { DepotService } from '../../service/depot.service';
import { LdepotService } from '../../service/ldepot.service';
import { TarifService } from '../../service/tarif.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';

@Component({
  selector: 'app-add-ldepot',
  templateUrl: './add-ldepot.component.html',
  styleUrls: ['./add-ldepot.component.scss']
})
export class AddLdepotComponent implements OnInit {
  pu : any;
  formData : Ldepot;
    destinationList : Destination[];
    isValid:boolean=true;
    constructor( public service:LdepotService,private toastr :ToastrService,
          @Inject(MAT_DIALOG_DATA)  public data,
          public dialogRef:MatDialogRef<AddLdepotComponent>,
          private destinationService:DestinationService,
          private tarifService:TarifService,
          private depotService:DepotService,public fb: FormBuilder){}
    ngOnInit() {
      this.destinationService.getAll().subscribe(
        response =>{this.destinationList= response;}
       );
  
       if(this.data.collecteIndex==null)
      {
        this.InfoForm();
      }
      else 
      {
         this.formData =Object.assign({},this.depotService.list[this.data.bonIndex])    
      }
      
  }
  
 
  InfoForm() {
    this.formData =  {
        id: null,
        
       
        num : this.depotService.list.length+1,
      
        poids: 0,
        designation:'',
        destination:'',
       
     
      
        montant : 0,
      };
      
    } 
  
    selectPrice(ctrl){
      if(ctrl.selectedIndex == 0){
        this.formData.poids = 0;
     
      }
      
      this.calcul();
    }
    

    calcul(){
 /*     const val = this.service.formData.value ;
      this.tarifService.getMontant(val.poids).subscribe(
        res =>{
        this.pu = res;
        });
      if (this.pu > 0)
{
  this.formData.montant = parseFloat((this.formData.poids * this.pu).toFixed(3));
    
}*/

this.formData.montant = parseFloat((this.formData.poids * 50).toFixed(3));
    
     }
    onSubmit(form:NgForm){
     
      if(this.validateForm(form.value)){
      if(this.data.bonIndex==null)
       this.depotService.list.push(form.value);
      else 
      this.depotService.list[this.data.bonIndex] = form.value;
      this.dialogRef.close();
         
    }
    }
    validateForm(formData:Ldepot){
      this.isValid=true;
      if(formData.poids == 0)
        this.isValid=false;
        else if(formData.poids ==0)
        this.isValid=false;
        return this.isValid;
    }
  }
  
  

