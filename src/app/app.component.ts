import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainComponent } from './features/main/main.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MainComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'barista-matic';
}
