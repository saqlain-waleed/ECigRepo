import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { purchasesComponent } from "./purchase.component";

const routes: Routes = [
  { path: "", component: purchasesComponent, pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class purchaseRoutingModule {}
