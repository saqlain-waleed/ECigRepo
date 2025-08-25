import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface BrandDto {
  id: string;
  brandName: string;
  description: string;
  logoUrl: string;
  website: string;
  isActive: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private apiUrl = 'https://localhost:44311/api/services/app/Brand';

  constructor(private http: HttpClient) {}

  /** Get all brands with paging, filtering, and sorting */
  getAll(request?: { keyword?: string; sorting?: string; skipCount?: number; maxResultCount?: number }): 
    Observable<{ items: BrandDto[]; totalCount: number }> {

    console.log("📡 Sending request to backend with params:", request);

    return this.http.get<any>(`${this.apiUrl}/GetAll`, { params: request as any }).pipe(
      map(response => {
        console.log("📡 Raw backend response:", response);
        return {
          items: response.result?.items || [],
          totalCount: response.result?.totalCount || 0
        };
      })
    );
  }

  /** Get single brand by ID */
  get(id: string): Observable<BrandDto> {
    console.log("📡 Get brand by ID:", id);
    return this.http.get<BrandDto>(`${this.apiUrl}/Get?id=${id}`);
  }

  /** Create a new brand */
  create(brand: BrandDto): Observable<BrandDto> {
    console.log("📡 Create brand:", brand);
    return this.http.post<BrandDto>(`${this.apiUrl}/Create`, brand);
  }

  /** Update an existing brand */
  update(brand: BrandDto): Observable<BrandDto> {
    console.log("📡 Update brand:", brand);
    return this.http.put<BrandDto>(`${this.apiUrl}/Update`, brand);
  }

  /** Delete a brand */
  delete(id: string): Observable<void> {
    console.log("📡 Delete brand by ID:", id);
    return this.http.delete<void>(`${this.apiUrl}/Delete?id=${id}`);
  }
}
