import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { inject } from '@angular/core';
import { User } from '../model/user';

export const guest: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
): Observable<boolean | UrlTree> => {
  const router = inject(Router);
  const auth = inject(AuthService);
  const token = auth.getToken;

  if (!token) {
    return of(true);
  }
  auth.authenticate(token).subscribe({
    next: (data: { user: User }) => {
      if (data) {
        return of(router.navigate(['/']));
      } else {
        auth.clearLoginSession();
        return router.navigate(next.url);
      }
    },
    error: (error) => {
      auth.clearLoginSession();
      return router.navigate(next.url);
    },
  });

  return of(false);
};
