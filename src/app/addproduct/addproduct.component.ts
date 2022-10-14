import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { product } from '../data-type';
import { ApiService } from '../service/api.service';


@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent implements OnInit {

  productform !: FormGroup;
  actionBtn: String = "Save";

  constructor(private formbuilder: FormBuilder, private api: ApiService, private dailogRef: MatDialogRef<AddproductComponent>, @Inject(MAT_DIALOG_DATA) public editData: any) { }

  ngOnInit(): void {
    this.productform = this.formbuilder.group({
      productName: ['', Validators.required],
      productPrice: ['', Validators.required],
      productColor: ['', Validators.required],
      productImage: ['', Validators.required],
      productDescription: ['', Validators.required],
    })

    console.warn('this.editData', this.editData);

    if (this.editData) {
      console.warn('herere');
      this.getproductById(this.editData);

    }


  }

  addProduct() {
    if (this.productform.valid) {
      this.api.productAdd(this.productform.value)
        .subscribe({
          next: (res) => {
            alert("Product added successfully")
            this.productform.reset();
            this.dailogRef.close("save");
          },
          error: () => {
            alert("error while adding product")
          }
        })
    }
  }


  addEditProduct() {
    if (!this.editData) this.addProduct();
    else this.updateProduct();
  }

  getproductById(id: string | number) {
    this.api.getProduct(id).subscribe((result: product) => {
      console.log("result ----", result);

      if (result) {
        this.actionBtn = "Update"
        this.productform.controls["productName"].setValue(result?.productName);
        this.productform.controls["productPrice"].setValue(result?.productPrice);
        this.productform.controls["productColor"].setValue(result?.productColor);
        this.productform.controls["productImage"].setValue(result?.productImage);
        this.productform.controls["productDescription"].setValue(result?.productDescription);

      }
    });

  }

  updateProduct() {
    console.log("updating product");
    console.warn(this.productform.value);
    let x = this.productform.value;
    if (this.productform.value) {
      x.id = this.editData;
    }
    this.api.updateProduct(x)
      .subscribe({
        next: (res) => {
          alert("Product updated successfully")
          this.productform.reset();
          this.dailogRef.close("Updated");
        },
        error: () => {
          alert("error while Updating product")
        }
      })
  }


}
