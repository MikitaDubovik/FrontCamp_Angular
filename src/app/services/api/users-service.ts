import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';

import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const baseUrl = environment.usersUrl;

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {

    }

    create(user: User): Observable<User> {
        const url = this.createUrl();
        return this.http.post<User>(url, user).pipe(
            map(resp => resp),
            catchError((err, caught) => {
                console.log(err);
                return caught;
            })
        );
    }

    private createUrl(details: string = '') {
        return baseUrl + details;
    }
}
