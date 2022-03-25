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
