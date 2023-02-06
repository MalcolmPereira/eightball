
import { predictschema, validate } from "../src/validator.js";

describe("User Validator Spec", () => {

    test("Validate Prediciton Request - Valid", (done) => {
        let predictRequest = {
            statement: "Some Valid Statement"
        };
        let validatedRequest = validate(predictRequest, predictschema);
        expect(validatedRequest).toBeTruthy();
        expect(validatedRequest.error).toBeFalsy();
        done();
    });

    test("Validate Prediciton Request - Empty", (done) => {
        let predictRequest = {
            statement: ""
        };
        let validatedRequest = validate(predictRequest, predictschema);
        expect(validatedRequest).toBeTruthy();
        expect(validatedRequest.error).toBeTruthy();
        done();
    });
});