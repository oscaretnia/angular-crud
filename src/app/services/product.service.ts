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
    'Authorization': 'JWT ' + localStorage.getItem('token')
  });

  getList(sortActive: string, order: string, pageSize: number, page: number, search: string): Observable<Response> {
    let params = new HttpParams();
    params = params.append('active', sortActive);
    params = params.append('order', order);
    params = params.append('search', search);
    params = params.append('pageSize', pageSize.toString());
    params = params.append('page', page.toString());

    return this.http.get<Response>(
      CONSTANST.routes.product.list,
      { headers: this.headers, params: params }
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
