import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { User } from '../model/user';

export const auth: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  _state
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
        auth.setUser = data.user;
        return router.navigate(route.url);
      } else {
        auth.clearLoginSession();
        return router.navigate(['/login']);
      }
    },
    error: (error) => {
      auth.clearLoginSession();
      return router.navigate(['/login']);
    },
  });

  return of(true);
};
