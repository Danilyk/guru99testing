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
	cy.get('.uniform > .3u > input').each( ($el, index) => {
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
	cy.get('.uniform > .3u > input').each( ($els, i) => {
		cy.wrap($els)
			.invoke('val')
			.should('have.length',lenArr[i]);
	});
});
// ---------------------- testing reset button functionality ----------------
Cypress.Commands.add('ResetButton', () => {	
	cy.get('input[value="Reset"]')
		.scrollIntoView()
		.should("be.visible")
		.click();	
	cy.get('.uniform > .3u > input').each( ($el) => {
		cy.wrap($el).should('have.value','');
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

Cypress.Commands.add('insertionCustomerValues', (i, data) => {
	const arr =['input[name="fname"]','input[name="lname"]','input[name="emailid"]','textarea[name="addr"]','input[name="telephoneno"]'];
	
	cy.get('.2u label').each( ($el, index) => {
		if ( index == i ){
			cy.wrap($el)
				.scrollIntoView()
				.should("be.visible")
				.click();
		}
	});
	arr.map((el,index) => {
		cy.get(el)
			.scrollIntoView()
			.should("be.visible")
			.type(data[index]);
	});
});

// -------------------------- submit correct data -----------------------------
Cypress.Commands.add('submitCorrectDataCustimer', () => {
	cy.get('input[value="Submit"]')
		.scrollIntoView()
		.should("be.visible")
		.click();
	cy.contains('h1','Access Details to Guru99 Telecom');
});
// ------------------------- SUBMIT INCORRECT DATA ----------------------------
Cypress.Commands.add('submitIncorrectDataCustomer', () => {
	const stub = cy.stub();  
	cy.on ('window:alert', stub);
	cy.get('input[value="Submit"]')
		.scrollIntoView()
		.should("be.visible")
		.click()
		.then(() => {
		  expect(stub.getCall(0)).to.be.calledWith('please fill all fields');
		});
});
// ---------------------- testing reset button functionality ----------------
Cypress.Commands.add('ResetButtonCustomer', () => {	

	cy.get('input[value="Reset"]')
		.scrollIntoView()
		.should("be.visible")
		.click();	
	
	cy.get('.2u label').each( ($el) => {
		cy.wrap($el).should('have.value','');
	});	
	cy.get('input[type="text"]').each( ($el) => {
		cy.wrap($el).should('have.value','');
	});
	cy.get('input[name="emailid"]').should('have.value','');
	
	cy.get('textarea[name="addr"]').should('have.value','');
});
// ---------------------- testing values out of range (longer) ----------------
Cypress.Commands.add('OverValuesCustomer', (lenArr) => {
	const arr =['input[name="fname"]','input[name="lname"]','input[name="emailid"]','textarea[name="addr"]','input[name="telephoneno"]'];
	arr.map( (el,i) => {
		cy.get(el)
			.invoke('val')
			.should('have.length',lenArr[i]);
	});
});