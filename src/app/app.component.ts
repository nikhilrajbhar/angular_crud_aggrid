import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { ApiService } from './service/api.service';
import { MatDialog } from '@angular/material/dialog';
import { AddproductComponent } from './addproduct/addproduct.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'my-app';


}
