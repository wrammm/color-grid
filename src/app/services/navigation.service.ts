import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  navigationStarted: boolean;
  previousUrl: string | null;
  private currentUrl: string;

  constructor(private router: Router) {
    this.navigationStarted = false;
    this.previousUrl = null;
    this.currentUrl = this.router.url;

    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {        
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      };
    });
  }

  public getPreviousUrl() {
    return this.previousUrl;
  }  

  public getCurrentUrl() {
    return this.currentUrl;
  }  
}
