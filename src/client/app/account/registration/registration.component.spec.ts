import { AuthenticationService } from '../../services/authentication.service';
import { RegistrationComponent } from './registration.component';

import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { async } from '@angular/core/testing';
import {
    BaseRequestOptions,
    ConnectionBackend,
    Http, HttpModule
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

export function main() {

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

            function populateComponent_validRegistration (comp) {
                comp.firstName = 'Gomez';
                comp.lastName = 'Addams';
                comp.email = 'gomez.addams@';
                comp.username = 'gomezy';
                comp.password = 'MyMorticia666';
                comp.confirmPassword = 'MyMorticia666';
            }

            describe("when supplied valid user data", () => {

                it("should call the authentication service", () => {

                    TestBed.compileComponents().then(() => {

                        let fixture = TestBed.createComponent(RegistrationComponent);
                        fixture.detectChanges();

                        let comp = fixture.componentInstance;

                        populateComponent_validRegistration(comp);

                        let authenticationService = fixture.debugElement.injector.get(AuthenticationService);

                        //spyOn()
                        let spy = spyOn(authenticationService, 'register')
                            .and.returnValue(Promise.resolve({test:'something'}));

                        //comp.register();

                    });

                });

                it("should post a valid NewUser type object", async(() => {



                }));


            });

            /*describe("when supplied invalid user data", () => {

                it("should not call the authentication service", () => {

                });
            });

            describe("when server is unavailable", () => {

                it("should handle post request server failures gracefully", () => {

                });
            });*/

        });

/*        describe("validateUser [method]", () => {

            it("should return false when supplied with any invalid NewUser data fields", () => {

            });

            it("should return true when all data fields supplied are valid", () => {

            });
        });

        /!**
         * Should be imported from external file
         *!/
        describe("validateEmail [external utility]", () => {

            it("should return true when identifying a correct email address", () => {

            });

            it("should return false when identifying an incorrect user email address", () => {

            });
        });

        describe("validateUsername [external utility]", () => {

            it("should return true when identifying a valid username", () => {

            });

            it("should return false when identifying an invalid username", () => {

            });
        });

        describe("validatePassword [external utility]", () => {

            it("should return false when password and confirmPassword fields don't match", () => {

            });

            it("should return false when password is less than 6 characters long", () => {

            });

            it("should return false when password does not contain at least one non-letter character", () => {

            });

            it("should return false when password does not contain at least one upper-case character", () => {

            });

            it("should return false when password does not contain at least one lower-case character", () => {

            });
        });*/

        /**
         * Check Taiseer's code for more validation that can be exposed on the client.
         */

    });
}
