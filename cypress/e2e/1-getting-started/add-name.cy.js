describe('Adding a name to the database', () => {
  const environment = ['localhost:3000'];
  it('adds a name in the input field then clicks the add button', () => {
    cy.visit(`http://${environment}`);
    cy.wait(1000);
    cy.get('[id=name-input]').type('Moby');
    cy.wait(1000);
    cy.get('.submit-btn').click();
    cy.wait(2000);
    cy.get('[id=close-btn]').click();
    cy.wait(1000);
    cy.get('#female').check();
    cy.wait(1000);
    cy.get('[id=name-input]').type('josie');
    cy.wait(1000);
    cy.get('.submit-btn').click();
    cy.wait(3000);
  });
});

let networkFails = [];

/* ********** ********** ********** ********** ********** ********** ********** ********** */
// Do not change below:
describe('app navigation', () => {
  const environments = ['localhost:3000'];
  const routesAll = [`/`];
  const width = 1920;
  const height = 1080;

  // note, this must be true to trouble shoot network requests
  let errorFlag = false;
  let thrownError = false; // default value do not change.

  environments.forEach((environment) => {
    // Do not change me
    describe('Test ' + environment + ' Environment', () => {
      beforeEach(function () {
        // cy.viewport(width, height);
      });
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
        describe('entrypoint' + entrypoint, () => {
          it('displays page', () => {
            // cy.intercept('*', (request) => {
            //     request.continue(response => {
            //       if(Number(response.statusCode) > 400) {
            //         thrownError = true;
            //         networkFails.push({request, response})
            //       }
            //     })
            // })
            cy.visit(`http://${environment}${entrypoint}`);
            cy.wait(1000);
            // .then(e => {if(errorFlag) { expect(thrownError).to.equal(false) } })
          });
        });
      });
    });
  });
});

// const shouldFailRoute = ['/invalid']

const saveNetworkFails = () => {
  cy.writeFile('cypress/fixtures/networkFails.json', networkFails);
};
after(() => {
  saveNetworkFails(); // runs after all tests, even when test fails
});

// Do not change above
/* ********** ********** ********** ********** ********** ********** ********** ********** */
