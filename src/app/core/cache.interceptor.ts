import { tap } from "rxjs/operators";
import {
  HttpContextToken,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpCacheService } from "./http-cache.service";
import { HttpResponse } from "@angular/common/http";

export const CACHEABLE = new HttpContextToken(() => true);

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  constructor(private chacheService: HttpCacheService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!req.context.get(CACHEABLE)) {
      return next.handle(req);
    }

    if (req.method !== "GET") {
      console.log(`Invalidating cache: ${req.method} ${req.url}`);
      this.chacheService.invalidateCache();
      return next.handle(req);
    }

    const cachedResponse: HttpResponse<any> = this.chacheService.get(req.url);

    if (cachedResponse) {
      console.log(`Returning a cached response: ${cachedResponse.url}`);
      console.log(cachedResponse);
      return of(cachedResponse);
    }

    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          console.log(`Adding iteem to cache: ${req.url}`);
          this.chacheService.put(req.url, event);
        }
      })
    );
  }
}
