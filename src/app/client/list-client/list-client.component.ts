import { Component, OnInit,Inject } from '@angular/core';
import { ClientService } from '../../service/client.service';
import { ToastrService } from 'ngx-toastr';
import { Client } from '../../model/Client';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import {MatDialog, MatDialogConfig,MatDialogRef,MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { AddClientComponent } from '../../client/add-client/add-client.component';
@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styles: [
  ]
})
export class ListClientComponent implements OnInit {
client:Client;
constructor(public crudApi: ClientService, public toastr: ToastrService,
  private router: Router, public fb: FormBuilder,
  private matDialog: MatDialog,
  @Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef:MatDialogRef<AddClientComponent>,) { }

ngOnInit() {
  
  this.getData();
}

getData() {
  this.crudApi.getAll().subscribe(
    response => { this.crudApi.list = response; 
  }
  );
}

removeData(code: string) {
  if (window.confirm('Are sure you want to delete this Client ?')) {
    this.crudApi.deleteData(code)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.warning(' data successfully deleted!');
          this.getData();
        },
        error => console.log(error));
  }
}
selectData(item : Client) {
  this.crudApi.choixmenu = "M";
  this.crudApi.formData = this.fb.group(Object.assign({},item));
  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus = true;
  dialogConfig.disableClose = true;
  dialogConfig.width="50%";
  
  this.matDialog.open(AddClientComponent, dialogConfig);
}
addClient()
{
  this.crudApi.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(AddClientComponent, dialogConfig);
  }
  
}

