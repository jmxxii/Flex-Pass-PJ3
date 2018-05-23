import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';


@Injectable({
  providedIn: 'root'
})
export class SearchService {
  results: any;
  constructor(private http: Http) { }

  searchResult(x) {
    console.log('x is : ', x);
    return this.http.post(`http://localhost:3000/search/gymsearch`, x)
    .map(res => {
      this.results = res;
      console.log('res in search service:----->', JSON.parse(this.results._body));
      res.json();
    })
      .catch(this.handleError);
  }




  handleError(e) {
    return Observable.throw(e.json().message);
  }





}