import { Component, OnDestroy } from '@angular/core';

import { ICellRendererAngularComp } from 'ag-grid-angular';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'btn-cell-renderer',
  template: `
    <div style="display: flex;">
    <span style="flex:1"><i (click)="btnClickedHandler($event)" class="fa fa-edit" style="color: blue;font-size:20px;cursor:pointer"></i> </span>
      <span style="flex:1"><i (click)="btnDeleteHandler($event)" class="fa fa-trash" style="color: red;font-size:20px;cursor:pointer"></i> </span>
    </div>   
  `,
})
export class BtnCellRenderer implements ICellRendererAngularComp {
  private params: any;
  public productId: any;
  faCoffee = faCoffee;

  agInit(params: any): void {
    this.params = params;
    this.productId = this.params.data?.id;
  }

  btnClickedHandler(event: any) {
    this.params.clicked(this.params.data?.id);
  }

  btnDeleteHandler(event: any) {
    this.params.delete(this.params.data?.id);
  }

  refresh() {
    return false;
  }
}
