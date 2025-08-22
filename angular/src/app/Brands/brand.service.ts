import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';   // ✅ keep map

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

  /** Get all brands */
getAll(): Observable<{ items: BrandDto[]; totalCount: number }> {
  return this.http.get<any>(`${this.apiUrl}/GetAll`).pipe(
    map(response => {
      console.log('✅ API GetAll response:', response);
      // ✅ unwrap `result` here
      return {
        items: response.result?.items || [],
        totalCount: response.result?.totalCount || 0
      };
    })
  );
}


  /** Get single brand by ID */
  get(id: string): Observable<BrandDto> {
    return this.http.get<BrandDto>(`${this.apiUrl}/Get?id=${id}`);
  }

  /** Create a new brand */
  create(brand: BrandDto): Observable<BrandDto> {
    return this.http.post<BrandDto>(`${this.apiUrl}/Create`, brand);
  }

  /** Update an existing brand */
  update(brand: BrandDto): Observable<BrandDto> {
    return this.http.put<BrandDto>(`${this.apiUrl}/Update`, brand);
  }

  /** Delete a brand */
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Delete?id=${id}`);
  }
}
