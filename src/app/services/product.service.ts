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
    return this.http.post<Response>(
      CONSTANST.routes.product.save,
      {
        code: product.code,
        name: product.name,
        description: product.description,
        reference: product.reference,
        locationStorage: product.locationStorage,
        id: product.id
      },
      { headers: this.headers }
    );
  }

}
