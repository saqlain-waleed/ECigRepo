import { Component, Injector, ChangeDetectorRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '../../shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '../../shared/paged-listing-component-base';

import { BrandService, BrandDto } from './brand.service';
import { CreatebrandDialogComponent } from './create-brand/create-brand-dialog.component';
import { EditbrandDialogComponent } from './edit-brand/edit-brand-dialog.component';

class PagedbrandsRequestDto extends PagedRequestDto {
  keyword!: string;
}

@Component({
  templateUrl: './brand.component.html',
  animations: [appModuleAnimation()]
})
export class brandsComponent extends PagedListingComponentBase<BrandDto> {
  brands: BrandDto[] = [];
  keyword = '';

  constructor(
    injector: Injector,
    private _modalService: BsModalService,
    private brandService: BrandService,
    cd: ChangeDetectorRef
  ) {
    super(injector, cd);
  }

  list(
    request: PagedbrandsRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    console.log("📌 list() called with request:", request, "pageNumber:", pageNumber);

    this.brandService.getAll().subscribe({
      next: (apiResponse) => {
        console.log("✅ Raw API Response:", apiResponse);

        let filteredItems = apiResponse.items || [];
        console.log("📌 Initial items count:", filteredItems.length);

        // Apply keyword filter
        if (this.keyword) {
          const keywordLower = this.keyword.toLowerCase();
          console.log("🔍 Applying keyword filter:", this.keyword);

          filteredItems = filteredItems.filter(b =>
            [b.brandName, b.description, b.logoUrl, b.website, String(b.isActive)]
              .some(v => v?.toLowerCase().includes(keywordLower))
          );

          console.log("📉 Items count after filtering:", filteredItems.length);
        }

        // Show paging
        console.log("📌 Passing to showPaging. Total Count:", apiResponse.totalCount, "Page:", pageNumber);
        this.showPaging({ items: filteredItems, totalCount: apiResponse.totalCount }, pageNumber);

        // Update local array
        this.brands = filteredItems;
        console.log("📌 Local brands updated. Count:", this.brands.length);

        finishedCallback();
        console.log("✅ finishedCallback executed");

        this.cd.detectChanges();
        console.log("🔄 Change detection triggered");
      },
      error: (err) => {
        console.error("❌ Error in getAll():", err);
        finishedCallback();
      }
    });
  }

  delete(brand: BrandDto): void {
    abp.message.confirm(
      `Delete brand '${brand.brandName}' ?`, undefined,
      (result: boolean) => {
        if (result) {
          this.brandService.delete(brand.id).subscribe(() => {
            abp.notify.success('Successfully deleted');
            this.refresh();
          });
        }
      }
    );
  }

  createbrand(): void {
    const modalRef: BsModalRef = this._modalService.show(CreatebrandDialogComponent, { class: 'modal-lg' });
    modalRef.content.onSave.subscribe(() => this.refresh());
  }

  editbrand(brand: BrandDto): void {
    const modalRef: BsModalRef = this._modalService.show(EditbrandDialogComponent, {
      class: 'modal-lg',
      initialState: { brand: { ...brand } }
    });
    modalRef.content.onSave.subscribe(() => this.refresh());
  }
}
