import { Injectable } from '@angular/core';
import {Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class MainService{

constructor(private http: Http){}

  getItems(){
  return this.http.get('/api/itemsToday')
    .map(res =>res.json());
}

updateItem(item:any){


    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    return this.http.put("/api/itemup/"+item._id, JSON.stringify(item), {headers: headers})
      .map(response => response.json());
}

}