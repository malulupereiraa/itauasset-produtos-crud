import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { featherAirplay, featherBox, featherHome, featherMenu } from '@ng-icons/feather-icons';

@Component({
  selector: 'app-default-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgIconComponent],
  viewProviders: [provideIcons({ featherHome, featherBox, featherMenu })],
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.scss'
})
export class DefaultLayoutComponent {

  activeMenu(e: Event) {
console.log(e)
  }

}
