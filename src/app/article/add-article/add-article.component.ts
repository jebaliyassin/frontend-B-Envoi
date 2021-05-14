import { Component, OnInit, Inject } from '@angular/core';
import { ArticleService } from '../../service/article.service'
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators }
  from '@angular/forms';
import { Router } from '@angular/router';
import { Article } from '../../model/Article';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Categorie } from 'src/app/model/categorie';
import { CategorieService } from 'src/app/service/categorie.service';
@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {
  num: any;
  code: string;
  CategorieList: Categorie[];
  userFile;
  public imagePath;
  imgURL: any;
  public message: string;
  constructor(public crudApi: ArticleService, public fb: FormBuilder, public toastr: ToastrService,

    public categorieService: CategorieService,
    private router: Router, @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<AddArticleComponent>,

  ) { }
  get f() { return this.crudApi.dataForm.controls; }
  ngOnInit() {
    if (this.crudApi.choixmenu == "A") { this.infoForm() };
    this.categorieService.getAll().subscribe(
      response => { this.CategorieList = response; }
    );
  }

  infoForm() {
    this.crudApi.dataForm = this.fb.group({
      id: null,
      code: ['', [Validators.required]],
      libelle: ['', [Validators.required]],
      pa: [0, [Validators.required]],
      pv: [0, [Validators.required]],
      tva: [0, [Validators.required]],
      stock: [0, [Validators.required]],
      ccateg: ['', [Validators.required]],
     
    });
  }

  ResetForm() {
    this.crudApi.dataForm.reset();
  }
  onSubmit() {
    if (this.crudApi.choixmenu == "A") {
      this.addData();
    }
    else {
      this.updateData()
    }
  }

  onSelectCateg(code: string) {
    
      this.crudApi.getNumero(code).subscribe(
        response => {
        this.num = response;
          if (this.num > 0) {
            this.code = (1000 + this.num + 1).toString().substring(1);
          }
          else {
            this.code = (code + '001');
          }
        
        
          this.f['code'].setValue(this.code);
        }
      );

    }
  

  addData() {
 
    const formData = new FormData();
    const article = this.crudApi.dataForm.value;
    formData.append('article', JSON.stringify(article));
    formData.append('file', this.userFile);
    this.crudApi.createData(formData).subscribe(data => {
      this.dialogRef.close();
      this.crudApi.getAll().subscribe(
        response =>{this.crudApi.list = response;}
       );
      this.router.navigate(['/articles']);
    });
  }
  updateData() {
    this.crudApi.updatedata(this.crudApi.dataForm.value.code, this.crudApi.dataForm.value).
      subscribe(data => {
        this.dialogRef.close();
        this.crudApi.getAll().subscribe(
          response =>{this.crudApi.list = response;}
         );
        this.router.navigate(['/articles']);
      });
  }

  onSelectFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userFile = file;
      // this.f['profile'].setValue(file);

      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.toastr.success('Only images are supported.');

        return;
      }
      var reader = new FileReader();
      this.imagePath = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      }
    }
  }
}
