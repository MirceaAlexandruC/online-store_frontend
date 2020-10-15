import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdersComponent } from '../orders/orders.component';
import { ProductsComponent } from '../products/products.component';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  public categoryType = undefined;
  public collapsed = true;
  orderFinished = false;

  @ViewChild('productsC')
  productsC: ProductsComponent;

  @ViewChild('shoppingCartC')
  shoppingCartC: ShoppingCartComponent;

  @ViewChild('ordersC')
  ordersC: OrdersComponent;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
    this.categoryType = params.get('categoryType');
    console.log(this.categoryType);
    });
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  finishOrder(orderFinished: boolean){
    this.orderFinished = orderFinished;
  }

  reset(){
    this.orderFinished = false;
    this.productsC.reset();
    this.shoppingCartC.reset();
    this.ordersC.paid = false;
  }
}
