import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterModule],
  template: `
    <p>
      main works!
    </p>
    <p><a routerLink="/order">Place an order</a></p>
  `,
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
