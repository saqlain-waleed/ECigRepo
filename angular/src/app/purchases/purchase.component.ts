import { Component, Injector, ChangeDetectorRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';

import { CreatepurchaseDialogComponent } from './create-purchase/create-purchase-dialog.component.';
import { EditpurchaseDialogComponent } from './edit-purchase/edit-purchase-dialog.component';

class PagedpurchasesRequestDto extends PagedRequestDto {
  keyword!: string;
}

export interface purchaseDto {
  id: number;
  productName: string;
  quantity: number;
  price: number;
  supplier: string;
  status: string;
}

@Component({
  templateUrl: './purchase.component.html',
  animations: [appModuleAnimation()]
})
export class purchasesComponent extends PagedListingComponentBase<purchaseDto> {
  /** Acts like your DB for now */
  private allPurchases: purchaseDto[] = [
    { id: 1, productName: 'Laptop', quantity: 2, price: 1200, supplier: 'TechStore', status: 'Pending' },
    { id: 2, productName: 'Mouse', quantity: 10, price: 25, supplier: 'AccessoryHub', status: 'Delivered' },
    { id: 3, productName: 'Keyboard', quantity: 5, price: 50, supplier: 'AccessoryHub', status: 'Pending' },
    { id: 4, productName: 'Monitor', quantity: 3, price: 300, supplier: 'DisplayWorld', status: 'Shipped' }
  ];

  purchases: purchaseDto[] = [];
  keyword = '';

  constructor(
    injector: Injector,
    private _modalService: BsModalService,
    cd: ChangeDetectorRef
  ) {
    super(injector, cd);
  }

  list(
    request: PagedpurchasesRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    // Filter + (future) sort/paging
    const filtered = this.keyword
      ? this.allPurchases.filter(p =>
        [p.productName, String(p.quantity), String(p.price), p.supplier, p.status]
          .some(v => v.toLowerCase().includes(this.keyword.toLowerCase()))
      )
      : [...this.allPurchases];


    // showPaging expects { items, totalCount }
    this.purchases = filtered;
    this.showPaging({ items: filtered, totalCount: filtered.length }, pageNumber);
    finishedCallback();
    this.cd.detectChanges();
  }

  delete(purchase: purchaseDto): void {
    abp.message.confirm(
      `Delete purchase '${purchase.productName}' (ID: ${purchase.id}) ?`, undefined,
      (result: boolean) => {
        if (result) {
          // remove from our "DB"
          this.allPurchases = this.allPurchases.filter(p => p.id !== purchase.id);

          // 🔑 adjust totalItems
          this.totalItems = this.allPurchases.length;

          // 🔑 check if current page is now empty
          const totalPages = Math.ceil(this.totalItems / this.pageSize);

          if (this.pageNumber > totalPages) {
            // if we deleted the last item on the last page, move back
            this.pageNumber = totalPages > 0 ? totalPages : 1;
          }

          abp.notify.success('Successfully deleted');
          this.refresh();
        }
      }
    );
  }


  createpurchase(): void {
    this.showCreateOrEditpurchaseDialog();
  }

  editpurchase(purchase: purchaseDto): void {
    this.showCreateOrEditpurchaseDialog(purchase.id, purchase);
  }

  /** Create (no args) or Edit (with purchase) */
  showCreateOrEditpurchaseDialog(id?: number, purchase?: purchaseDto): void {
    let modalRef: BsModalRef;

    if (!purchase) {
      // CREATE
      modalRef = this._modalService.show(CreatepurchaseDialogComponent, {
        class: 'modal-lg'
      });
    } else {
      // EDIT (pass full purchase so dialog can show ID & prefill)
modalRef = this._modalService.show(EditpurchaseDialogComponent, {
  class: 'modal-lg',
  initialState: {
    purchase: { ...purchase }   // must match @Input() type in the edit dialog
  }
});
    }

    modalRef.content.onSave.subscribe((saved: purchaseDto) => {
      if (saved.id) {
        // If ID exists, update existing
        const idx = this.allPurchases.findIndex(x => x.id === saved.id);
        if (idx !== -1) this.allPurchases[idx] = saved;
      } else {
        // Assign new ID and add
        const newId = this.allPurchases.length
          ? Math.max(...this.allPurchases.map(p => p.id)) + 1
          : 1;
        this.allPurchases.push({ ...saved, id: newId });
      }
      this.refresh();
    });
  }
}
