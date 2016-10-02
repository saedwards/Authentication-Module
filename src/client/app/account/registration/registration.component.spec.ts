import { AuthenticationService } from '../../services/authentication.service';
import { RegistrationComponent } from './registration.component';

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

            function populateComponent_validUserData (comp) {
                comp.firstName = 'Gomez';
                comp.lastName = 'Addams';
                comp.email = 'gomez.addams@';
                comp.username = 'gomezy';
                comp.password = 'MyMorticia666';
                comp.confirmPassword = 'MyMorticia666';
            }

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

            /*describe("when server is unavailable", () => {

                it("should handle post request server failures gracefully", async(() => {

                    /!**
                     * Check DOM elements display correctly with correct feedback
                     *!/

                }));

            });*/

        });

/*        describe("validateUser [method]", () => {

            it("should return false when supplied with any invalid NewUser data fields", async(() => {

            }));

            it("should return true when all data fields supplied are valid", async(() => {

            }));
        });

        /!**
         * Should be imported from external file
         *!/
        describe("validateEmail [external utility]", () => {

            it("should return true when identifying a correct email address", async(() => {

            }));

            it("should return false when identifying an incorrect user email address", async(() => {

            }));
        });

        describe("validateUsername [external utility]", () => {

            it("should return true when identifying a valid username", async(() => {

            }));

            it("should return false when identifying an invalid username", async(() => {

            }));
        });

        describe("validatePassword [external utility]", () => {

            it("should return false when password and confirmPassword fields don't match", async(() => {

            }));

            it("should return false when password is less than 6 characters long", async(() => {

            }));

            it("should return false when password does not contain at least one non-letter character", async(() => {

            }));

            it("should return false when password does not contain at least one upper-case character", async(() => {

            }));

            it("should return false when password does not contain at least one lower-case character", async(() => {

            }));
        });*/

        /**
         * Check Taiseer's code for more validation that can be exposed on the client.
         */

    });
}
