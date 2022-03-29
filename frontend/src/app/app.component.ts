import { Component, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  @ViewChild('main') main: ElementRef;
  title = 'frontend';
  searchIsActive = false;
  navAndHeaderActive: boolean;

  constructor(private location: Location) {}

  public onRouterOutletActivate(event: any) {
    // tslint:disable-next-line: max-line-length
    if (event.router.url === '/login' || event.router.url === '/register' || event.router.url === '/register/password' || event.router.url === '/register/picture') {
      this.navAndHeaderActive = false;
    } else {
      this.navAndHeaderActive = true;
    }
  }

  toggleSearch() {
    this.searchIsActive = !this.searchIsActive;
  }

  backwards() {
    this.location.back();
  }
}
