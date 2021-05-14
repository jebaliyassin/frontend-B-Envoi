import { Component, OnInit ,Inject } from '@angular/core';
import { Agent} from 'src/app/model/agent';
import { AgentService} from '../../service/agent.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder,  FormControl }
from '@angular/forms';
import { AddAgentComponent } from '../../agent/add-agent/add-agent.component';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
@Component({
  selector: 'app-list-agent',
  templateUrl: './list-agent.component.html',
  styles: [
  ]
})
export class ListAgentComponent implements OnInit {

  p: number = 1;
  agent : Agent;
 // control: FormControl = new FormControl('');
  constructor(public crudApi:AgentService, public toastr: ToastrService,
    private router : Router,public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<AddAgentComponent>,) { }
 
  ngOnInit() {
    
    this.getData();
  }
  addAgent()
  {
    this.crudApi.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    //dialogConfig.data="gdddd";
    this.matDialog.open(AddAgentComponent, dialogConfig);
  }
 
  

  
  getData() {
    this.crudApi.getAll().subscribe(
      response =>{this.crudApi.list = response;}
     );
   
  }
  
 
  removeData(id: number) {
    if (window.confirm('Are sure you want to delete this Agent?')) {
    this.crudApi.deleteData(id)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.warning(' data successfully deleted!'); 
          this.getData();
        },
        error => console.log(error));
  }
  }
  selectData(item : Agent) {
    this.crudApi.choixmenu = "M";
    this.crudApi.formData= this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    
    this.matDialog.open(AddAgentComponent, dialogConfig);
  }



}
