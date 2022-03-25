//-------------------- <<<< START!!!   TELECOM ADD CUSTOMER >>>> ----------------------


const inputArray =['input[name="fname"]','input[name="lname"]','input[name="emailid"]','textarea[name="addr"]','input[name="telephoneno"]'];

Cypress.Commands.add('insertDataCustomer', (data) => {
	cy.get('.2u label').each( ($el, index) => {
		if ( index === data[0] ){
			cy.wrap($el)
				.scrollIntoView()
				.should("be.visible")
				.click();
		}
	});
	inputArray.map((el,index) => {
		cy.get(el)
			.scrollIntoView()
			.should("be.visible")
			.type(data[index+1]);
	});
});

// -------------------------- submit data -----------------------------
Cypress.Commands.add('submitDataCustomer', () => {
	const stub = cy.stub();  
	cy.on ('window:alert', stub );
	cy.get('input[value="Submit"]')
		.scrollIntoView()
		.should("be.visible")
		.click();
	return cy.wrap(stub);
});

// -------------------------- valid data check -----------------------------
Cypress.Commands.add('validCheckData', () => {
	cy.contains('h1','Access Details to Guru99 Telecom');
});

// -------------------------- invalid data check -----------------------------
Cypress.Commands.add('invalidCheckData', (stub) => {
	expect(stub.getCall(0)).to.be.calledWith('please fill all fields');
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
Cypress.Commands.add('OverValuesCustomer', (maxLengthFields) => {
	inputArray.map( (el,i) => {
		cy.get(el)
			.invoke('val')
			.should('have.length',maxLengthFields[i]);
	});
});
