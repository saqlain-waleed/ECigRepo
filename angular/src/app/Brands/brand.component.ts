import { Component, Injector, ChangeDetectorRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '../../shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '../../shared/paged-listing-component-base';

import { BrandService, BrandDto } from './brand.service';
import { CreatebrandDialogComponent } from './create-brand/create-brand-dialog.component';
import { EditbrandDialogComponent } from './edit-brand/edit-brand-dialog.component';

class PagedbrandsRequestDto extends PagedRequestDto {
  keyword!: string;
  sorting!: string;
}

@Component({
  templateUrl: './brand.component.html',
  animations: [appModuleAnimation()]
})
export class brandsComponent extends PagedListingComponentBase<BrandDto> {
  brands: BrandDto[] = [];
  keyword = '';
  sortField: string = 'brandName';
  sortDirection: 'ASC' | 'DESC' = 'ASC';

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
    request.keyword = this.keyword;
    request.sorting = `${this.sortField} ${this.sortDirection}`;
    request.skipCount = (pageNumber - 1) * this.pageSize;
    request.maxResultCount = this.pageSize;

    console.log("📌 list() called with request:", request);

    this.brandService.getAll(request).subscribe({
      next: (apiResponse) => {
        console.log("✅ API response received:", apiResponse);

        this.showPaging(
          { items: apiResponse.items, totalCount: apiResponse.totalCount },
          pageNumber
        );

        this.brands = apiResponse.items;
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

  toggleSort(field: string): void {
    console.log("🔀 toggleSort() called for field:", field);

    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'ASC' ? 'DESC' : 'ASC';
    } else {
      this.sortField = field;
      this.sortDirection = 'ASC';
    }

    console.log(`📌 Sorting applied: ${this.sortField} ${this.sortDirection}`);
    this.getDataPage(1);
  }

  delete(brand: BrandDto): void {
    console.log("🗑️ delete() called for brand:", brand);

    abp.message.confirm(
      `Delete brand '${brand.brandName}' ?`, undefined,
      (result: boolean) => {
        if (result) {
          this.brandService.delete(brand.id).subscribe(() => {
            console.log("✅ Brand deleted:", brand.id);
            abp.notify.success('Successfully deleted');
            this.refresh();
          });
        } else {
          console.log("❌ Delete cancelled for brand:", brand.id);
        }
      }
    );
  }

  createbrand(): void {
    console.log("➕ createbrand() called");
    const modalRef: BsModalRef = this._modalService.show(CreatebrandDialogComponent, { class: 'modal-lg' });
    modalRef.content.onSave.subscribe(() => {
      console.log("✅ Create brand saved, refreshing list");
      this.refresh();
    });
  }

  editbrand(brand: BrandDto): void {
    console.log("✏️ editbrand() called with brand:", brand);
    const initialState = { brand: { ...brand } };
    const modalRef: BsModalRef = this._modalService.show(EditbrandDialogComponent, {
      class: 'modal-lg',
      initialState: initialState
    });
    modalRef.content.onSave.subscribe(() => {
      console.log("✅ Brand edited, refreshing list");
      this.refresh();
    });
  }
}
