import { Component, OnInit,Inject} from '@angular/core';
import { Poids } from '../../model/poids';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { PoidsService } from '../../service/poids.service';
import { NgForm } from '@angular/forms';
import { Tarif } from '../../model/tarif';
import { TarifService } from '../../service/tarif.service';
 import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
@Component({
  selector: 'app-add-ltarif',
  templateUrl: './add-ltarif.component.html',
  styleUrls: ['./add-ltarif.component.scss']
})
export class AddLtarifComponent implements OnInit {
  
  formData : Tarif;
  poidsList : Poids[];
  isValid:boolean=true;
  constructor( public service:TarifService,private toastr :ToastrService,
        @Inject(MAT_DIALOG_DATA)  public data,
        public dialogRef:MatDialogRef<AddLtarifComponent>,
        private poidsService:PoidsService,public fb: FormBuilder){}
  ngOnInit() {
    

     if(this.data.tarifIndex==null)
    {
      this.InfoForm();
    
    }
    else 
    {
       this.formData =Object.assign({},this.service.list[this.data.tarifIndex])    
    }
    
}


InfoForm() {
  this.formData =  {
      id: null,
      code:'',
      typecourrier:'',
      codedes:'',
      ligne: this.service.list.length +1,
      deb : this.service.max + 1,
      fin : 0,
     
     
    
      
      montant :0,
      
    };
  } 

  


  
 
  onSubmit(form:NgForm){
    
   alert(this.data.tarifIndex)
    if(this.validateForm(form.value)){
    if(this.data.tarifIndex==null)
    {
     this.service.list.push(form.value);
     this.service.max = this.formData.fin;
     alert(this.service.max);
    }
    else 
    this.service.list[this.data.tarifIndex] = form.value;
    this.dialogRef.close();
       
  }
  }
  validateForm(formData:Tarif){
    this.isValid=true;
    
      if(formData.deb ==0)
      this.isValid=false;
      else if(formData.fin < formData.deb)
      this.isValid=false;
      else if(formData.montant==0)
      this.isValid=false;
      return this.isValid;
  }
}



