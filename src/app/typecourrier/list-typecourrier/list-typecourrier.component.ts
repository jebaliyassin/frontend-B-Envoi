import { Component, OnInit,Inject } from '@angular/core';
import { TypecourrierService } from '../../service/typecourrier.service';
import { ToastrService } from 'ngx-toastr';
import { Typecourrier } from '../../model/Typecourrier';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import {MatDialog, MatDialogConfig,MatDialogRef,MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { AddTypecourrierComponent } from '../../typecourrier/add-typecourrier/add-typecourrier.component';

@Component({
  selector: 'app-list-typecourrier',
  templateUrl: './list-typecourrier.component.html',
  styles: [
  ]
})
export class ListTypecourrierComponent implements OnInit {
  categorie: Typecourrier;
  constructor(public crudApi: TypecourrierService, public toastr: ToastrService,
    private router: Router, public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<AddTypecourrierComponent>,) { }

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
    if (window.confirm('Are sure you want to delete this type ?')) {
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
  selectData(item : Typecourrier) {
    this.crudApi.choixmenu = "M";
    this.crudApi.formData = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    
    this.matDialog.open(AddTypecourrierComponent, dialogConfig);
  }
  addTypecourrier()
  {
    this.crudApi.choixmenu = "A";
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true;
      dialogConfig.width="50%";
      this.matDialog.open(AddTypecourrierComponent, dialogConfig);
    }
    
  }

