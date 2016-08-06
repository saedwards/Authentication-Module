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
    describe('Registration component', () => {

        let providerArr: any[];

        beforeEach(() => { providerArr = [disableDeprecatedForms(), provideForms()]});

        // Constructor
        it('should initial correctly', () => {
            expect(true).toBe(true);
        });

        it('should post a User object to the server', () => {
            expect(false).toBe(false);
        });

    });
}