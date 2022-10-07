const { CYCLIC_KEY } = require("@storybook/addon-actions")


describe("Appointments", () => {
  beforeEach (() => {
    cy.request('GET', "/api/debug/reset")
    cy.visit("/")
    cy.contains("Monday")
  })

  it("should book and interview", () => {
    cy.get("[alt=Add]")
      .first()
      .click()
    cy.get('[data-testid=student-name-input]')
      .type('Lydia Miller-Jones')
    cy.get("[alt='Sylvia Palmer']")
      .click()
    cy.contains("Save")
      .click()
      cy.contains(".appointment__card--show", "Lydia Miller-Jones");
      cy.contains(".appointment__card--show", "Sylvia Palmer");
  })

  it("Should edit an interview", () => {
    cy.get("[alt=Edit]")
      .first()
      .click({force: true})
    cy.get("[alt='Tori Malcolm']")
      .click()
    cy.get('[data-testid=student-name-input]')
      .clear()
      .type('Roberto Cervantes')
      cy.contains("Save")
      .click()
      cy.contains(".appointment__card--show", "Roberto Cervantes");
  })

  it("Should cancel an interview", () => {
    cy.get("[alt=Delete]")
      .click({force: true})
    cy.contains('Confirm')
      .click()
    cy.contains('DELETING...').should("exist")
    cy.contains('DELETING...').should("not.exist")

    cy.contains(".appointment__card--show", "Archie Cohen")
    .should("not.exist");
  })
})
