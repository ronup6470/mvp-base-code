import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { forkJoin } from 'rxjs/Observable/forkJoin';
//------------------------------------------------//
import { DeepMerge } from './deepmerge.utils';

/** TranslationResource */
export interface TranslationResource {

    /** prefix */
    prefix: string;
    /** suffix */
    suffix: string;
}

/** MultiTranslateHttpLoader */
export class MultiTranslateHttpLoader implements TranslateLoader {
    /** requests */
    public requests: Observable<object>[];
    constructor(
        private resources: TranslationResource[],
        private http: HttpClient
    ) {
        this.requests = [];
    }

    /** getTranslation */
    public getTranslation(lang: string): Observable<object> {
        this.requests = this.resources.map((resource: TranslationResource) => {
            let httpHeader: HttpHeaders = new HttpHeaders({
                'No-auth': 'true'
            })
            return this.http.get(resource.prefix + lang + resource.suffix, { headers: httpHeader });
        });
        return forkJoin(this.requests).pipe(map(
            (response: object[]) => {
                return new DeepMerge().deepMergeAll(response);
            }));
    }
}