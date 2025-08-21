import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output,
  ChangeDetectorRef,
  Input,
} from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";
import { AppComponentBase } from "../../../shared/app-component-base";

export interface purchaseDto {
  id: number;
  productName: string;
  quantity: number;
  price: number;
  supplier: string;
  status: string;
}

@Component({
  templateUrl: "edit-purchase-dialog.component.html",
})
export class EditpurchaseDialogComponent
  extends AppComponentBase
  implements OnInit {
  saving = false;

  /** purchase comes in from parent via initialState */
  @Input() purchase: purchaseDto = {
    id: 0,
    productName: '',
    quantity: 1,
    price: 0,
    supplier: '',
    status: 'Pending'
  };

  suppliers = ['TechStore', 'AccessoryHub', 'DisplayWorld'];
  statuses = ['Pending', 'Shipped', 'Delivered', 'Completed', 'Cancelled'];

  @Output() onSave = new EventEmitter<purchaseDto>();

  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef,
    private cd: ChangeDetectorRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    // nothing to do — purchase is injected from parent
    this.cd.detectChanges();
  }

  save(): void {
    this.saving = true;

    // Simulate API delay (replace with service call later)
    setTimeout(() => {
      this.notify.info("Saved successfully");

      // send updated purchase object to parent
      this.onSave.emit(this.purchase);

      this.bsModalRef.hide();
      this.saving = false;
    }, 500);
  }

  cancel(): void {
    this.bsModalRef.hide();
  }
}
