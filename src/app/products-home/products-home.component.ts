import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { AddproductComponent } from '../addproduct/addproduct.component';
import { product } from '../data-type';
import { ApiService } from '../service/api.service';
import { BtnCellRenderer } from './btn-cell-renderer.component';
import { ImageFormatterComponent } from './ImageFormatterComponent';

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: ['./products-home.component.scss']
})
export class ProductsHomeComponent  {
  productList:product[] | undefined;

  constructor(private api: ApiService, public dialog: MatDialog) { }
  
  onGridReady(params: GridReadyEvent) {
    this.getAllProducts();
  }

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  
columnDefs: ColDef[] = [
  { field: 'productImage',  headerName:"Image",cellRendererFramework: ImageFormatterComponent },
  { field: 'productName', headerName:"Name"},
  { field: 'productPrice', headerName:"Price" },
  { field: 'productColor', headerName:"Color" },
  { field: 'productDescription', headerName:"Description"},
  { field: 'Action',  
  cellRenderer: BtnCellRenderer,
  cellRendererParams: {
    clicked: (field: any) => {
      console.warn(field);
      this.editProduct(field);
    },
    delete: (id: any)=>{
      console.warn('delete');
      console.warn(id);
      this.deleteProduct(id)
    } },}
];

editProduct(row: any) {
  console.log("row calling");
  this.dialog.open(AddproductComponent,
    {
      width: "30%",
      data: row
    }).afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getAllProducts();

    });
}

getAllProducts() {
  this.api.getProductList().subscribe({
    next: (res) => {
      console.warn(res);
      this.productList = res;
    },
    error: (err) => {
      alert("Error while data")
    }
  })
}
 
addProduct() {
  const dialogRef = this.dialog.open(AddproductComponent, {
    width: '40%',
  });

  dialogRef.afterClosed().subscribe(result => {
    this.getAllProducts();
    console.log(`Dialog result: ${result}`);
  });
}

deleteProduct(id:any){
  console.log("row");
  console.log(id);
  this.api.deleteProduct(id).subscribe({
    next:(res)=>{
      console.log(res);
      this.getAllProducts();
      alert("product deleted");
    },
    error:(res)=> alert("Error while deleting product")
  })
}


}
