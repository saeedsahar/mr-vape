import { Component } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
ngOnInit() {
  console.log('Component initialized');
//   this.cartService.getItems().subscribe(items => {
//     console.log('Cart items:', items);
//   });
}
}
