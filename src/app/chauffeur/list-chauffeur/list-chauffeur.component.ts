import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chauffeur } from 'src/app/model/chauffeur';
import { ChauffeurService } from 'src/app/service/chauffeur.service';
import { AddChauffeurComponent } from '../add-chauffeur/add-chauffeur.component';

@Component({
  selector: 'app-list-chauffeur',
  templateUrl: './list-chauffeur.component.html',
  styles: [
  ]
})
export class ListChauffeurComponent implements OnInit {

  chauffeur:Chauffeur;
constructor(public crudApi: ChauffeurService, public toastr: ToastrService,
  private router: Router, public fb: FormBuilder,
  private matDialog: MatDialog,
  @Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef:MatDialogRef<AddChauffeurComponent>,) { }

ngOnInit() {
  
  this.getData();
}

getData() {
  this.crudApi.getAll().subscribe(
    response => { this.crudApi.list = response; 
  }
  );
}

removeData(id :number) {
  if (window.confirm('Are sure you want to delete this Chauffeur ?')) {
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
selectData(item : Chauffeur) {
  this.crudApi.choixmenu = "M";
  this.crudApi.formData = this.fb.group(Object.assign({},item));
  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus = true;
  dialogConfig.disableClose = true;
  dialogConfig.width="50%";
  
  this.matDialog.open(AddChauffeurComponent, dialogConfig);
}
addChauffeur()
{
  this.crudApi.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    dialogConfig.height="90%";
    this.matDialog.open(AddChauffeurComponent, dialogConfig);
  }
  
}






















