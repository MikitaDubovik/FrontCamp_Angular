import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';

import { catchError } from 'rxjs/operators';

const baseUrl = 'http://localhost:3000/users';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {

    }

    create(user: User) {
        const url = this.createUrl();
        this.http.post<User>(url, user).pipe(
            catchError(err => {
                return err;
            })
        ).subscribe((data) => {
        });
    }

    private createUrl(details: string = '') {
        return baseUrl + details;
    }
}
