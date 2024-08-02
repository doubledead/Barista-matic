import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockLevelService {

  constructor() { }

  stockLevel = new BehaviorSubject(0);
}
