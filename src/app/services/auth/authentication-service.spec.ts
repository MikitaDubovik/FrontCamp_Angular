import { AuthenticationService } from "./authentication-service";
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Article } from 'src/app/models/article';


describe('AuthenticationService', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let service: AuthenticationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        httpClient = TestBed.get(HttpClient);
        httpTestingController = TestBed.get(HttpTestingController);
        service = new AuthenticationService(httpClient);
    });

    afterEach(() => {
        service = null;
        localStorage.removeItem('currentUser');
    })

    it('should remove item from localStorage', () => {
        localStorage.setItem('currentUser', '12345');
        expect(localStorage.getItem('currentUser')).toEqual('12345');

        service.logout();

        expect(localStorage.getItem('currentUser')).toBeNull();
    });

    it('should send post request and get user data', () => {
        service.login('test', 'test').subscribe(data => {

        });
        const req = httpTestingController.expectOne('http://localhost:3000/users/login');
        expect(req.request.method).toEqual('POST');
        let user = {
            user:
            {
                user:
                {
                    token:
                        '12345'
                }
            }
        }

        req.flush(user);
        httpTestingController.verify();
        expect(localStorage.getItem('currentUser')).toEqual(JSON.stringify(user));
    });

});