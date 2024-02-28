import { CanActivate, CanActivateFn, Router } from '@angular/router';

export class AuthGuard implements CanActivate {

  private isAuthenticated: boolean = false;

  constructor(private router: Router) {
    // Set the initial authentication status based on your conditions
    this.isAuthenticated = this.checkAuthentication();
  }

  canActivate(): boolean {
    if (this.isAuthenticated) {
      return true; // Allow navigation to the route
    } else {
      this.router.navigate(['login']);
      return false; // Block navigation to the route
    }
  }

  private checkAuthentication(): boolean {
    // Implement your custom logic to determine if the user is authenticated
    // For example, check the presence of a flag or perform some other check
    return true; // Set to true or false based on your conditions
  }
}