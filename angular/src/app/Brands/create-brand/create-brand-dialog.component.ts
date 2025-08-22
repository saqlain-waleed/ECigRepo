import { Component, Injector, OnInit, EventEmitter, Output, ChangeDetectorRef } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";
import { AppComponentBase } from "../../../shared/app-component-base";
import { BrandDto, BrandService } from "../brand.service";

@Component({
  templateUrl: "create-brand-dialog.component.html",
})
export class CreatebrandDialogComponent extends AppComponentBase implements OnInit {
  saving = false;
  brand: BrandDto = {
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

    this.brandService.create(this.brand).subscribe({
      next: (result) => {
        this.notify.info("Brand created successfully");
        this.onSave.emit(result);
        this.bsModalRef.hide();
      },
      error: () => { this.saving = false; },
      complete: () => { this.saving = false; }
    });
  }
}
