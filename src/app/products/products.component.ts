import { AfterContentChecked, AfterContentInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../models/product';
import { ProductOrder } from '../models/product-order';
import { ProductOrders } from '../models/product-orders';
import { EcommerceService } from '../services/ecommerce.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, AfterContentInit {
    productOrders: ProductOrder[] = [];
    products: Product[] = [];
    selectedProductOrder: ProductOrder;
    private shoppingCartOrders: ProductOrders;
    sub: Subscription;
    productSelected: boolean = false;
    

    @Input() filter;

    constructor(private ecommerceService: EcommerceService) {
    }
    ngOnInit() {
        this.productOrders = [];
        this.loadProducts();
        this.loadOrders();
    }
    ngAfterContentInit(){
        this.loadCart();
    }
    loadCart(){
        let cart = localStorage.getItem("cart");
        // console.log("cart",cart);
        if(cart){
            let products:ProductOrder[] = JSON.parse(cart);
            console.log(products);
            for(let product of products){
                this.addToCart(product, true);
                console.log(product);
            }
        }
    }
    saveCart(){
        localStorage.setItem("cart", JSON.stringify(this.shoppingCartOrders.productOrders));
        console.log("saved cart");
    }
    addToCart(product: ProductOrder, withoutSaving=false) {
        this.ecommerceService.SelectedProductOrder = product;
        this.selectedProductOrder = this.ecommerceService.SelectedProductOrder;
        this.productSelected = true;
        if(!withoutSaving)
            setTimeout(()=>{this.saveCart()}, 0);
    }

    removeFromCart(productOrder: ProductOrder) {
        let index = this.getProductIndex(productOrder.product);
        if (index > -1) {
            this.shoppingCartOrders.productOrders.splice(
                this.getProductIndex(productOrder.product), 1);
        }
        this.ecommerceService.ProductOrders = this.shoppingCartOrders;
        this.shoppingCartOrders = this.ecommerceService.ProductOrders;
        this.productSelected = false;
    }

    getProductIndex(product: Product): number {
        return this.ecommerceService.ProductOrders.productOrders.findIndex(
            value => value.product === product);
    }

    isProductSelected(product: Product): boolean {
        return this.getProductIndex(product) > -1;
    }

    loadProducts() {
        this.ecommerceService.getAllProducts()
            .subscribe(
                (products: any[]) => {
                    this.products = products;
                    this.products.filter((value) => this.filter!=null ? value.categoryType == this.filter : true).forEach(product => {
                        this.productOrders.push(new ProductOrder(product, 0));
                    })
                },
                (error) => console.log(error)
            );
    }

    loadOrders() {
        this.sub = this.ecommerceService.OrdersChanged.subscribe(() => {
            this.shoppingCartOrders = this.ecommerceService.ProductOrders;
        });
    }

    reset() {
        this.productOrders = [];
        // this.loadProducts();
        this.ecommerceService.ProductOrders.productOrders = [];
        this.loadOrders();
        this.productSelected = false;
    
    }
}
