import { HttpInterceptorFn } from '@angular/common/http';
import { Inject, Injector } from '@angular/core';
import { Authservice } from '../../services/Auth/authservice';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const _Authservice = Inject(Authservice);
  const token = _Authservice.GetToken();

  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  return next(req);
};
