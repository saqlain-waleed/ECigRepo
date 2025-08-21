import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output,
  ChangeDetectorRef,
} from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";
import { AppComponentBase } from "@shared/app-component-base";

interface purchaseDto {
  id: number;
  productName: string;
  quantity: number;
  price: number;
  supplier: string;
  status: string;
}

@Component({
  templateUrl: "create-purchase-dialog.component.html",
})
export class CreatepurchaseDialogComponent
  extends AppComponentBase
  implements OnInit {
  saving = false;
  purchase: purchaseDto = {
    id: 0,
    productName: '',
    quantity: 1,
    price: 0,
    supplier: '',
    status: 'Pending'
  };

  suppliers = ['TechStore', 'AccessoryHub', 'DisplayWorld'];
  statuses = ['Pending', 'Shipped', 'Delivered', 'Completed', 'Cancelled'];

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef,
    private cd: ChangeDetectorRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    // Initialization if needed
    this.cd.detectChanges();
  }

  save(): void {
    this.saving = true;

    // Simulate API call
    setTimeout(() => {
      this.notify.info("Saved successfully");

      // Emit the new purchase object back to parent
      this.onSave.emit(this.purchase);

      this.bsModalRef.hide();
      this.saving = false;
    }, 1000);
  }
}
