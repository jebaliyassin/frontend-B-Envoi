import { Component, OnInit,Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators }
  from '@angular/forms';
import { Grade } from 'src/app/model/grade';
import { Agence } from 'src/app/model/agence';
import { AgentService } from 'src/app/service/agent.service';
import { AgenceService } from 'src/app/service/agence.service';
import{GradeService}from '../../service/grade.service';
import { Router } from '@angular/router';
import { MatDialogRef } from "@angular/material/dialog";
@Component({
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styles: [
  ]
})
export class AddAgentComponent implements OnInit {
  get f() { return this.crudApi.formData.controls }
  num :any;
  GradeList: Grade[];
  AgenceList: Agence[];
  constructor(public crudApi:AgentService,public fb: FormBuilder,
    public gradeService: GradeService,
    public agenceService: AgenceService,
    public toastr: ToastrService,
    private router : Router,
    public dialogRef:MatDialogRef<AddAgentComponent>,)  { }
  ngOnInit(): void {
    if (this.crudApi.choixmenu == 'A')
    {this.infoForm()};
    this.gradeService.getAll().subscribe(
      response =>{this.GradeList= response;}
     );
    
     this.agenceService.getAll().subscribe(
      response =>{this.AgenceList = response;}
     );

   }
  
  infoForm() {
    this.crudApi.formData = this.fb.group({
        id: null,
        mat: [0, [Validators.required]],
        nom: ['', [Validators.required]],
        codeg: ['', [Validators.required]],
        codres: ['', [Validators.required]],
       
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
    else {
  
      this.updateData()
    }  
}
  
onSelectCodeg(ctrl){
  
  if(ctrl.selectedIndex == 0){
    this.f['codeg'].setValue('');

  }
  else{
    this.f['codeg'].setValue(this.GradeList[ctrl.selectedIndex-1].code);

  }
 
}
onSelectCodres(ctrl){
  
  if(ctrl.selectedIndex == 0){
    this.f['codres'].setValue('');

  }
  else{
    this.f['codres'].setValue(this.AgenceList[ctrl.selectedIndex-1].code);

  }
 
}
lister()
{
  this.router.navigate(['/agents']);
}

addData() {
  this.crudApi.createData(this.crudApi.formData.value).
  subscribe( data => {
    
    this.dialogRef.close();
    this.crudApi.getAll().subscribe(
      response =>{this.crudApi.list = response;
      //alert('ggggg')
      ;}
     );
    this.router.navigate(['/agents']); 
  });
}
  updateData()
  {
    this.crudApi.updatedata(this.crudApi.formData.value.id,this.crudApi.formData.value).
    subscribe( data => {
      this.dialogRef.close();
     
      this.crudApi.getAll().subscribe(
        response =>{this.crudApi.list = response;}
       );
      this.router.navigate(['/agents']); 
    });
  }

 


}
