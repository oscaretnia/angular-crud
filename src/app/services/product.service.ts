import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { CONSTANST } from '~utils/constanst';
import { Product } from '~app/models/product';
import { Response } from '~app/models/response';

import { Provider } from '~base/provider';
import { Observable } from 'rxjs';

@Injectable()
export class ProductService implements Provider {
  loading = true;

  constructor(
    private http: HttpClient,
  ) { }

  headers = new HttpHeaders({
    'x-access-token': localStorage.getItem('token')
  });

  getList(): Observable<Response> {
    return this.http.get<Response>(
      CONSTANST.routes.product.list,
      { headers: this.headers }
    );
  }

  delete(id: number): Observable<Response> {
    return this.http.delete<Response>(
      CONSTANST.routes.product.delete.replace(':id', String(id)),
      { headers: this.headers }
    );
  }

  getOne(id: number): Observable<Response> {
    return this.http.get<Response>(
      CONSTANST.routes.product.get.replace(':id', String(id)),
      { headers: this.headers }
    );
  }

  save(product: Product): Observable<Response> {

    const formData = new FormData();
    formData.append('image', product.image);
    formData.append('code', product.code);
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('reference', product.reference);
    formData.append('locationStorage', product.locationStorage);

    if (product.id) {
      return this.http.patch<Response>(
        CONSTANST.routes.product.update.replace(':id', String(product.id)),
        formData,
        { headers: this.headers }
      );
    } 

    return this.http.post<Response>(
      CONSTANST.routes.product.save,
      formData,
      { headers: this.headers }
    );
  }

}
