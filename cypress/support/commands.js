// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


//-------------------- <<<< START!!!!  TELECOM ADD TARIFF >>>> ----------------------

//------------------------ insert value into fields -------------------------
Cypress.Commands.add('insertionValues', (val) => {
	cy.get('.uniform > .3u > input').then( $els => {
		Cypress.$.makeArray($els)
		.map((el) => {
			cy.get(el)
				.scrollIntoView()
				.should("be.visible")
				.type(val);
		});
	});
});
//---------------------- insert one invalid value into fields --------------------
Cypress.Commands.add('oneInsertionValues', (val, item, bad) => {
	cy.get('.uniform > .3u > input').each( ($el, index, $list) => {
		if ( index == item){
			cy.wrap($el)
				.scrollIntoView()
				.should("be.visible")
				.type(bad);
		} else {
			cy.wrap($el)
				.scrollIntoView()
				.should("be.visible")
				.type(val);	
		}		
	});
});
// ---------------------- testing values out of range (longer) ----------------
Cypress.Commands.add('OverValues', (lenArr) => {
	let i=0;
	cy.get('.uniform > .3u > input').then( ($els) => {
		Cypress.$.makeArray($els)
		.map((el) => {
			cy.get(el)
			.invoke('val')
  			.then(someVal => {
				expect(someVal.length).to.equal(lenArr[i]);
				i++;
			});
		});
	});
});
// ---------------------- testing reset button functionality ----------------
Cypress.Commands.add('ResetButton', () => {	
	cy.get('input[value="Reset"]')
		.scrollIntoView()
		.should("be.visible")
		.click();	
	cy.get('.uniform > .3u > input').then( ($els) => {
		Cypress.$.makeArray($els)
		.map((el) => {
			cy.get(el)
			.invoke('val')
  			.then(someVal => {
				expect(someVal).to.equal('');
			});
		});
	});
});
// -------------------------- submit correct data -----------------------------
Cypress.Commands.add('submitCorrectData', () => {
	cy.get('input[value="submit"]')
		.scrollIntoView()
		.should("be.visible")
		.click();
	cy.contains('h2','Congratulation you add Tariff Plan');
});
// ------------------------- SUBMIT INCORRECT DATA ----------------------------
Cypress.Commands.add('submitIncorrectData', () => {
	const stub = cy.stub();  
	cy.on ('window:alert', stub);
	cy.get('input[value="submit"]')
		.scrollIntoView()
		.should("be.visible")
		.click()
		.then(() => {
		  expect(stub.getCall(0)).to.be.calledWith('please fill all fields Correct Value');
		});
});

//---------------------- <<<< END!!!   TELECOM ADD TARIFF >>>> ------------------------

//********************************************************************************

//-------------------- <<<< START!!!   TELECOM ADD CUSTOMER >>>> ----------------------

Cypress.Commands.add('insertionCustomerValues', (i,arrTextField, email, address) => {
	
	cy.get('.2u label').each( ($el, index, $list) => {
		if ( index == i ){
			cy.wrap($el)
				.scrollIntoView()
				.should("be.visible")
				.click();
		}
	});
	
	cy.get('input[type="text"]').each( ($el, index, $list) => {
		cy.wrap($el)
			.scrollIntoView()
			.should("be.visible")
			.type(arrTextField[index]);
	});
	cy.get('input[name="emailid"]')
		.scrollIntoView()
		.should("be.visible")
		.type(email);
	
	cy.get('textarea[name="addr"]')
		.scrollIntoView()
		.should("be.visible")
		.type(address);

});


