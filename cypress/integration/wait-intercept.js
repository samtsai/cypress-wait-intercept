/// <reference types="cypress" />
describe("page", () => {
  it("works", () => {
    cy.intercept("POST", "**/api", (req) => {
      const { body } = req;
      if (body) {
        console.log("body", body);
        console.log(body.toString());
        const name = body.match(/name="callerName"[\r\n]+(.*)-*/i)[1];
        req.alias = name;
      }
    });
    cy.visit("http://localhost:3000");
    const calls = ["call1", "call2", "call3", "call4"];
    calls.forEach((call) => {
      cy.wait(`@${call}`).then(({ response }) => {
        expect(response).to.be.ok;
        expect(response.body.name).to.equal(call);
      });
    });
  });
});
