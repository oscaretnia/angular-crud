import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { ProductService } from '~services/product.service';
import { SnackbarComponent } from '~components/snackbar/snackbar.component';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})

export class FormsComponent implements OnInit {
  public frm: FormGroup;
  fileInputLabel: string;

  constructor(
    public dialogRef: MatDialogRef<FormsComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private fb: FormBuilder,
    private productService: ProductService,
    public snack: MatSnackBar
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.initializeForm();
  }

  openSnack(data: any) {
    this.snack.openFromComponent(SnackbarComponent, {
      data: { data: data },
      duration: 3000
    });
  }

  private initializeForm() {
    const IS_EDITING = this.data.action === 'edit';
    const data = this.data.data;

    this.frm = this.fb.group({
      code: new FormControl(IS_EDITING ? data.code : null, [Validators.required]),
      name: new FormControl(IS_EDITING ? data.name : null, [Validators.required]),
      description: new FormControl(IS_EDITING ? data.description : null, [Validators.required]),
      reference: new FormControl(IS_EDITING ? data.reference : null, [Validators.required]),
      locationStorage: new FormControl(IS_EDITING ? data.locationStorage : null, [Validators.required]),
      image: new FormControl(IS_EDITING ? data.image : null, [Validators.required]),
      id: new FormControl(IS_EDITING ? data.id : null)
    });
  }

  public onFileSelect(event: any) {
    const file = event.target.files[0];
    this.fileInputLabel = file.name;
    this.frm.get('image').setValue(file);
  }

  public save(form: FormGroup) {
    this.productService.save(form.value).subscribe((data: any) => {
      this.openSnack(data);
      if (data.success) {
        this.dialogRef.close(true);
      }
    });
  }

  public getCodeErrorMessage() {
    return this.frm.controls.code.hasError('required') ? 'Code is required' : '';
  }

  public getNameErrorMessage() {
    return this.frm.controls.name.hasError('required') ? 'Name is required' : '';
  }

  public getDescriptionErrorMessage() {
    return this.frm.controls.description.hasError('required') ? 'Description is required' : '';
  }

  public getReferenceErrorMessage() {
    return this.frm.controls.reference.hasError('required') ? 'Reference is required' : '';
  }

  public getLocationStorageErrorMessage() {
    return this.frm.controls.locationStorage.hasError('required') ? 'Location Storage is required' : '';
  }

  public getImageErrorMessage() {
    return this.frm.controls.image.hasError('required') ? 'Image is required' : '';
  }

}
