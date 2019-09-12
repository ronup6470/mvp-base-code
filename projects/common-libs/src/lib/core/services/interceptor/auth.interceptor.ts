/**
 * @author Hem Chudgar
 */
import { switchMap, tap, finalize, take } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import {
    HttpRequest, HttpHandler, HttpInterceptor, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent,
    HttpResponse, HttpUserEvent, HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LoaderService } from '../loader/loader.service';
import { AuthService } from '../auth/auth.service';
import { User } from 'oidc-client';

/**
 * AuthInterceptor
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    /** count */
    public count: number;

    constructor(
        private loaderService: LoaderService,
        private authService: AuthService,
        @Inject('environment') private environment: any
    ) {
        this.count = 0;
    }

    /**
     * intercept
     * @param request 
     * @param next 
     */
    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse |
        HttpProgressEvent | HttpResponse<object> | HttpUserEvent<object>> {

        if ((request.url.indexOf('/channels')) === -1) {
            this.loaderService.showLoader(true);
            this.count++;
        }

        if (request.url.indexOf(this.environment.cmsUrl) !== -1) {
            request = request.clone({ headers: request.headers.delete('No-auth', 'true') });
            return this.handleRequest(request, next);
        }

        if (request.headers.get('No-auth') === 'true') {
            return this.handleRequest(request, next);
        }
        return this.authService.getUserData().pipe(
            take(1),
            switchMap((user: User) => {
                if (user && user.access_token) {

                    request = request.clone({
                        setHeaders: {
                            Authorization: `Bearer ${user.access_token}`
                        }
                    });

                }
                return this.handleRequest(request, next);
            })
        );
    }

    /**
     * handleRequest
     * @param request 
     * @param next 
     */
    public handleRequest(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(tap(), finalize(() => {
                if ((request.url.indexOf('/channels')) === -1) {
                    this.count--;
                }
                if (this.count === 0) {
                    this.loaderService.showLoader(false);
                }
            })
            );
    }
}
