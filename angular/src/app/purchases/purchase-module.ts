import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { purchaseRoutingModule } from "./purchase-routing.module";
import { purchasesComponent } from "./purchase.component";
import { CreatepurchaseDialogComponent } from "./create-purchase/create-purchase-dialog.component.";
import { EditpurchaseDialogComponent } from "./edit-purchase/edit-purchase-dialog.component";
import { SharedModule } from "@shared/shared.module";

@NgModule({
  declarations: [
    purchasesComponent,
    CreatepurchaseDialogComponent,
    EditpurchaseDialogComponent,
  ],
  imports: [CommonModule, purchaseRoutingModule, SharedModule],
})
export class purchaseModule {}
