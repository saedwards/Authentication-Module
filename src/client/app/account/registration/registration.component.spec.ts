import { AuthenticationService } from '../../services/authentication.service';
import { RegistrationComponent } from './registration.component';

import { By }              from '@angular/platform-browser';
import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
    BaseRequestOptions,
    ConnectionBackend,
    Http, HttpModule
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

export function main() {

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

    describe('Registration component', () => {

        var authenticationServiceStub = {
            register:() => new Promise(() => {})
        };

        beforeEach(() => {

            TestBed.configureTestingModule({
                imports: [FormsModule, RouterModule, HttpModule],
                declarations: [RegistrationComponent],
                providers: [
                    BaseRequestOptions,
                    MockBackend,
                    {
                        provide: Http,
                        useFactory: function (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
                            return new Http(backend, defaultOptions);
                        },
                        deps: [MockBackend, BaseRequestOptions]
                    },
                    {
                        provide: AuthenticationService,
                        useValue: authenticationServiceStub
                    }
                ]
            });

        });

        // Constructor
        it('should initialise correctly', async(() => {

            TestBed.compileComponents().then(() => {

                let fixture = TestBed.createComponent(RegistrationComponent);
                fixture.detectChanges();

                let comp = fixture.componentInstance,
                    el = fixture.debugElement.children[0].nativeElement;

                expect(el).toBeDefined();
                expect(comp).toBeDefined();

                expect(comp.firstName).toBe('');
                expect(comp.lastName).toBe('');
                expect(comp.email).toBe('');
                expect(comp.username).toBe('');
                expect(comp.password).toBe('');
                expect(comp.confirmPassword).toBe('');

                expect(comp.authenticationService).toBeDefined();
                expect(comp.authenticationService.register).toBeDefined();

            });

        }));

        describe("register [method]", () => {

            var fixture,
                comp,
                authenticationService;

            function populateComponent_validUserData (comp) {
                comp.firstName = 'Gomez';
                comp.lastName = 'Addams';
                comp.email = 'gomez.addams@';
                comp.username = 'gomezy';
                comp.password = 'MyMorticia666';
                comp.confirmPassword = 'MyMorticia666';
            }

            describe("when service is available", () => {

                beforeEach(async(() => {

                    TestBed.compileComponents().then(() => {

                        fixture = TestBed.createComponent(RegistrationComponent);
                        fixture.detectChanges();

                        comp = fixture.componentInstance;
                        authenticationService = fixture.debugElement.injector.get(AuthenticationService);

                        spyOn(authenticationService, 'register')
                            .and.returnValue(Promise.resolve());

                    });

                }));

                describe("when supplied valid user data", () => {

                    beforeEach(async(() => {

                        populateComponent_validUserData(comp);

                    }));

                    it("should call the authentication service", async(() => {

                        fixture.detectChanges();
                        fixture.whenStable().then(() => {
                            fixture.detectChanges();

                            comp.register();
                            expect(authenticationService.register).toHaveBeenCalled();

                        });

                    }));

                    it("should send a valid NewUser type object", async(() => {

                        fixture.detectChanges();
                        fixture.whenStable().then(() => {
                            fixture.detectChanges();

                            comp.register();

                            expect(authenticationService.register).toHaveBeenCalledWith({
                                FirstName: 'Gomez',
                                LastName: 'Addams',
                                Email: 'gomez.addams@',
                                Username: 'gomezy',
                                Password: 'MyMorticia666',
                                ConfirmPassword: 'MyMorticia666'
                            });

                        });

                    }));

                });

                describe("when supplied invalid user data", () => {

                    it("should not call the authentication service", async(() => {

                        fixture.detectChanges();
                        fixture.whenStable().then(() => {
                            fixture.detectChanges();

                            comp.register();

                            expect(authenticationService.register).not.toHaveBeenCalled();

                        });

                    }));

                });

            });

            describe("when service is unavailable", () => {

                var fakePromiseReject = 'Fake server error';

                beforeEach(async(() => {

                    TestBed.compileComponents().then(() => {

                        fixture = TestBed.createComponent(RegistrationComponent);
                        fixture.detectChanges();

                        comp = fixture.componentInstance;
                        authenticationService = fixture.debugElement.injector.get(AuthenticationService);

                        spyOn(authenticationService, 'register')
                            .and.returnValue(Promise.reject(fakePromiseReject));

                        populateComponent_validUserData(comp);

                        comp.register();

                    });

                }));

                it("should handle post request server failures gracefully", async(() => {

                    fixture.detectChanges();
                    fixture.whenStable().then(() => {
                        fixture.detectChanges();

                        /**
                         * Check DOM elements display correctly with correct feedback
                         */
                        let el = fixture.debugElement.queryAll(By.css('.error-list'))[0];

                        /**
                         * Expect error list to be populated
                         */
                        expect(el.nativeElement.children.length).toBeGreaterThan(0);
                        expect(comp.errors.length).toBeGreaterThan(0);
                    });

                }));

            });

        });

    });
}
