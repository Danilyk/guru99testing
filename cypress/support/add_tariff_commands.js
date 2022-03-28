//-------------------- <<<< START!!!!  TELECOM ADD TARIFF >>>> ----------------------

//------------------------ insert value into fields -------------------------
Cypress.Commands.add('insertTariffData', (val) => {
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
Cypress.Commands.add('insertOneInvalidTariffValues', (val, item, bad) => {
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
Cypress.Commands.add('OverTariffValues', (arrayMaxLength) => {
	cy.get('.uniform > .3u > input').each( ($els, i) => {
		cy.wrap($els)
			.invoke('val')
			.should('have.length',arrayMaxLength[i]);
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
// -------------------------- submit tariff data -----------------------------
Cypress.Commands.add('submitTariffData', () => {
	const stub = cy.stub();  
	cy.on ('window:alert', stub);
	cy.get('input[value="submit"]')
		.scrollIntoView()
		.should("be.visible")
		.click();
	return cy.wrap(stub);
});

// -------------------------- check correct data -----------------------------
Cypress.Commands.add('correctTariffDataCheck', () => {
	cy.contains('h2','Congratulation you add Tariff Plan');
});
// -------------------------- check incorrect data -----------------------------
Cypress.Commands.add('incorrectTariffDataCheck', (stub) => {
	expect(stub.getCall(0)).to.be.calledWith('please fill all fields Correct Value');
});


