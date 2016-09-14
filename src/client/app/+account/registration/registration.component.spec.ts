import { TestComponentBuilder } from '@angular/compiler/testing';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { Component } from '@angular/core';
import {
    inject,
    async
} from '@angular/core/testing';
import { getDOM } from '@angular/platform-browser/src/dom/dom_adapter';

import { RegistrationComponent } from './registration.component';

export function main() {

    describe("Registration component", () => {

        let providerArr: any[];

        beforeEach(() => { providerArr = [disableDeprecatedForms(), provideForms()]});

        // Constructor
        it("should initialise correctly", () => {
            expect(true).toBe(true);
        });

        describe("register [method]", () => {

            describe("when supplied valid user data", () => {

                it("should post a valid NewUser type object", () => {
                    expect(false).toBe(false);
                });

                it("should call the authentication service", () => {

                });
            });

            describe("when supplied invalid user data", () => {

                it("should not call the authentication service", () => {

                });
            });

            describe("when server is unavailable", () => {

                it("should handle post request server failures gracefully", () => {

                });
            });

        });

        describe("validateUser [method]", () => {

            it("should return false when supplied with any invalid NewUser data fields", () => {

            });

            it("should return true when all data fields supplied are valid", () => {

            });
        });

        /**
         * Should be imported from external file
         */
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
        });

        /**
         * Check Taiseer's code for more validation that can be exposed on the client.
         */

    });
}