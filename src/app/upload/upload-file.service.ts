import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryModel } from '../categoryModel';
import { stringify } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  category_name: string = "sda";
  ct: CategoryModel;


  private cateogryUrl = 'api/cateogry/saveCategory';  // URL to web api

  constructor(private http: HttpClient) { }





  pushFileToStorage(file: File, category: CategoryModel): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();

    formdata.append('file', file);
    formdata.append('category', new Blob([JSON.stringify({ "id": "2", "category_name": "Kreme", "category_description": "opiss" })], { type: "application/json" }))

    const req = new HttpRequest('POST', 'api/cateogry/saveCategory', formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  pushFileToStorageM(file: File, category: CategoryModel): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    console.log(category.category_name)
    formdata.append('file', file);
    formdata.append('category', new Blob([JSON.stringify({ "id": "1", "category_name": "category.category_name", "category_description": "category.category_description" })], { type: "application/json" }))

    const req = new HttpRequest('PUT', 'api/cateogry/updateCategoryM/2', formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  addHero(category: String): Observable<any> {

    return this.http.post<File>(this.cateogryUrl, category)
      .pipe(
        // catchError(this.handleError('addHero', file))
      );
  }


  addCategory(category: CategoryModel): Observable<any> {
    return this.http.post<File>(this.cateogryUrl, category)
      .pipe(
        // catchError(this.handleError('addHero', file))
      );
  }
  getFiles(): Observable<any> {
    return this.http.get('/getallfiles');
  }
}
