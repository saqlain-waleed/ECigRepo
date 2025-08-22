import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { brandRoutingModule } from "./brand-routing.module";
import { brandsComponent } from "./brand.component";
import { CreatebrandDialogComponent } from "./create-brand/create-brand-dialog.component";
import { EditbrandDialogComponent } from "./edit-brand/edit-brand-dialog.component";
// Update the import path to the correct relative location
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  declarations: [
    brandsComponent,
    CreatebrandDialogComponent,
    EditbrandDialogComponent,
  ],
  imports: [CommonModule, brandRoutingModule, SharedModule],
})
export class brandModule {}
