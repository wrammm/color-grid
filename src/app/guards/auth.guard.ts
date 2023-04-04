import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { NavigationService } from '../services/navigation.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private navigationService: NavigationService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // on game route refresh, it should route to levels
    if (state.url === '/game' && this.navigationService.getPreviousUrl() === null
      && this.navigationService.getCurrentUrl() !== '/levels') {
      this.router.navigate(['/levels']);
      return false;
    }
    return true;
  }
}
