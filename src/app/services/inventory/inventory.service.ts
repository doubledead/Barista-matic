import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InventoryItem } from 'src/app/models/inventoryItem';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getInventoryItems(): Observable<any> {
    return this.http.get<InventoryItem>(this.url + '/inventory');
  }
}
