import { Component, Injector, OnInit, EventEmitter, Output, ChangeDetectorRef, Input } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";
import { AppComponentBase } from "../../../shared/app-component-base";
import { BrandDto, BrandService } from "../brand.service";

@Component({
  templateUrl: "edit-brand-dialog.component.html",
})
export class EditbrandDialogComponent extends AppComponentBase implements OnInit {
  saving = false;

  @Input() brand: BrandDto = {
    id: '',
    brandName: '',
    description: '',
    logoUrl: '',
    website: '',
    isActive: false
  };

  @Output() onSave = new EventEmitter<BrandDto>();

  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef,
    private cd: ChangeDetectorRef,
    private brandService: BrandService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.cd.detectChanges();
  }

  save(): void {
    this.saving = true;

    this.brandService.update(this.brand).subscribe({
      next: (result) => {
        this.notify.info("Brand updated successfully");
        this.onSave.emit(result);
        this.bsModalRef.hide();
      },
      error: () => { this.saving = false; },
      complete: () => { this.saving = false; }
    });
  }

  cancel(): void {
    this.bsModalRef.hide();
  }
}
