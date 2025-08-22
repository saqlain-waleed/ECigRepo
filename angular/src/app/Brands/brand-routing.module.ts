import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { brandsComponent } from "./brand.component";

const routes: Routes = [
  { path: "", component: brandsComponent, pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class brandRoutingModule {}
