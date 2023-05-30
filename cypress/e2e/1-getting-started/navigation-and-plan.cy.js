/// <reference types="cypress" />

// enter uses for the application here as test names.
// later we will break out into separate test files.
describe('jax pet name generator website', () => {
  const environment = [ "localhost:3000" ]
  it('navigates and clicks a bunch of buttons', () => { 
    cy.visit(`http://${environment}`)
    cy.get('.active').click();
    cy.wait(1000)
    cy.get('.generate-btn-container > button').click();
    cy.wait(1000)
    cy.get('.generate-btn-container > button').click();
    cy.wait(1000)
    cy.get('.generate-btn-container > button').click();
    cy.wait(1000)
    cy.get('.generate-btn-container > button').dblclick();
    cy.wait(1000)
    cy.get('.active').click();
    cy.wait(1000)
    cy.get('.active').click();
    cy.wait(1000)
    cy.get('.generate-btn-container > button').click();
    cy.wait(1000)
    cy.get('.generate-btn-container > button').click();
  });
})

let networkFails = []; 

/* ********** ********** ********** ********** ********** ********** ********** ********** */
// Do not change below:
describe('app navigation', () => {
  const environments = [ "localhost:3000" ]
  const routesAll = [`/`]
  const width = 1920;
  const height = 1080;

  // note, this must be true to trouble shoot network requests
  let errorFlag = false;
  let thrownError = false; // default value do not change.

  environments.forEach((environment) => { // Do not change me
    describe('Test '+ environment + ' Environment', () => {
        beforeEach(function() {
            // cy.viewport(width, height);
        })
        Cypress.on('window:before:load', (win) => {
            cy.spy(win.console, 'error');
            cy.spy(win.console, 'warn');
        });
          
          afterEach(() => {
            cy.window().then((win) => {
              expect(win.console.error).to.have.callCount(0);
              expect(win.console.warn).to.have.callCount(0);
            });
          });
          routesAll.forEach((entrypoint) => {
            describe(('entrypoint' + entrypoint), () => {
                
                it('displays page', () => {
                    // cy.intercept('*', (request) => {
                    //     request.continue(response => {
                    //       if(Number(response.statusCode) > 400) {
                    //         thrownError = true;
                    //         networkFails.push({request, response})
                    //       }
                    //     })
                    // })
                    cy.visit(`http://${environment}${entrypoint}`)
                    cy.wait(1000)
                    // .then(e => {if(errorFlag) { expect(thrownError).to.equal(false) } })
                })
            })
        })
    })
  })
})

// const shouldFailRoute = ['/invalid']

const saveNetworkFails = () => { cy.writeFile('cypress/fixtures/networkFails.json', networkFails) }
after(() => {
  saveNetworkFails()            // runs after all tests, even when test fails
})

// Do not change above
/* ********** ********** ********** ********** ********** ********** ********** ********** */