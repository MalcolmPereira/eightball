import request from "supertest";

import magic8service from "../src/service.js";


//Prediction Tests
describe("Magic 8 Prediction Tests", () => {

    test("Test Valid Magic 8 Request", (done) => {
        let predictRequest = {
            statement: "Some Valid Statement"
        };
        request(magic8service())
            .post("/magic8/predict")
            .send(predictRequest)
            .set("Accept", "application/json")
            .then((response) => {
                console.log(response.body.result);
                expect(response.statusCode).toBe(200);
                done();
            });
    });
    test("Test Invalid Magic 8 Request", (done) => {
        let predictRequest = {
            statement: ""
        };
        request(magic8service())
            .post("/magic8/predict")
            .send(predictRequest)
            .set("Accept", "application/json")
            .then((response) => {
                expect(response.statusCode).toBe(400);
                done();
            });
    });
});