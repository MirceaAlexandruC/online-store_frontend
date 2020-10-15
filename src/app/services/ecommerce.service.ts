import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProductOrder} from '../models/product-order';
import { ProductOrders} from '../models/product-orders';


@Injectable({
  providedIn: 'root'
})
export class EcommerceService {
  private staticUri = "http://localhost:8080";

  private productOrder: ProductOrder;
  private orders: ProductOrders = new ProductOrders();

  private productOrderSubject = new Subject();
  private ordersSubject = new Subject();
  private totalSubject = new Subject();

  private total: number;

  ProductOrderChanged = this.productOrderSubject.asObservable();
  OrdersChanged = this.ordersSubject.asObservable();
  TotalChanged = this.totalSubject.asObservable();

  constructor(private _httpClient: HttpClient){}

  getAllProducts(){
    return this._httpClient.get(this.staticUri+'/api/products');
  }

  saveOrder(order: ProductOrders){
    return this._httpClient.post(this.staticUri+'/api/orders', order);
  }

  set SelectedProductOrder(value: ProductOrder){
    this.productOrder = value;
    this.productOrderSubject.next();
  }


  get SelectedProductOrder(){
    return this.productOrder;
  }


  set ProductOrders(value: ProductOrders){
    this.orders = value;
    this.ordersSubject.next();
  }

  get ProductOrders(){
    return this.orders;
  }

  get Total(){
    return this.total;
  }

  set Total(value: number){
    this.total = value;
    this.totalSubject.next();
  }

}
