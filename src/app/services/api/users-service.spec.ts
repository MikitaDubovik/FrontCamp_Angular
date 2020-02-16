import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { UserService } from './users-service';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

describe('UserService', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;

    let service: UserService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        httpClient = TestBed.get(HttpClient);
        httpTestingController = TestBed.get(HttpTestingController);
        service = new UserService(httpClient);
    });

    afterEach(() => {
        service = null;
    });

    it('should creaate user', () => {
        const user = {
            user:
            {
                user:
                {
                    token:
                        '12345'
                }
            }
        };

        service.create(new User()).subscribe(data => {
            expect(JSON.stringify(data)).toEqual(JSON.stringify(user));
        });

        const req = httpTestingController.expectOne(environment.usersUrl);
        expect(req.request.method).toEqual('POST');
        req.flush(user);
        httpTestingController.verify();
    });
});
