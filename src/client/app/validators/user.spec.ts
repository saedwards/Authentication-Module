import ValidateUser from './user';

export function main() {

    describe("validate [method]", () => {

        it("should return false when supplied with any invalid NewUser data fields", () => {
            ValidateUser.validate({});
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

}