//-------------------- <<<< START!!!   PAYMENT GATEWAY >>>> ----------------------

// ----------------------<< generate new card data >>-------------------------
Cypress.Commands.add('generateCard', (array) => {
	cy.contains('a','Generate Card Number').invoke('removeAttr', 'target').click();
	cy.contains('h2','Here is your New Card');

	const cardData = {};
	cy.get('.inner > h4')
		.each( ($els, i) => {
			cy.get($els).invoke('text').then( innerText => {
				switch(i){
					case 0: cardData.cardNumber = innerText.split('-')[1].trim();
							break;
					case 1: cardData.cvvCode = innerText.split('-')[1].trim();
							break;
					case 2: cardData.month = innerText.split('-')[1].split('/')[0].trim();
							cardData.year = innerText.split('-')[1].split('/')[1].trim();
							break;
					case 3: cardData.money = innerText.split('$')[1].trim();
							break;
				}
			});	
	});
	return cy.wrap(cardData);
});

Cypress.Commands.add('selectProductInCart', (quant) => {
	cy.contains('#nav a','Cart').click();
	cy.get('select[name="quantity"]').select(quant);
	cy.get('input[value="Buy Now"]').click();
});

Cypress.Commands.add('insertCardData', (cardData) => {
	cy.get('input[name="card_nmuber"]').type(cardData.cardNumber);
	cy.get('select[name="month"]').select(cardData.month);
	cy.get('select[name="year"]').select(cardData.year);
	cy.get('input[name="cvv_code"]').type(cardData.cvvCode);
	cy.get('.actions input[type="submit"]').click();	
});

Cypress.Commands.add('correctPaymentCheck', () => {
	cy.contains('h2','Payment successfull!');
});
					 
Cypress.Commands.add('incorrectPaymentCheck', () => {
	cy.contains('h2','Payment error!');
});		

Cypress.Commands.add('checkCardBalance', (cardNum) => {
	cy.contains('#nav a','Check Credit Card Limit').click();
	cy.get('input[name="card_nmuber"]').type(cardNum);
	cy.get('input[value="submit"]').click();
	cy.contains('h4', 'Credit Card Balance')
		.get('span')
		.invoke('text')
		.then( cardBalance => {
			return cy.wrap(cardBalance);
		});
});	

Cypress.Commands.add('emptyMontYear', (cardData) => {
	cy.get('form[name="fbal"]').within( () => {
		const stub = cy.stub;
		cy.on ('window:alert', stub );
		
		cy.get('.actions input[type="submit"]').click();
		
		cy.get('select:invalid').should('have.length',2);
		cy.get('select[name="month"]').select(cardData.month);
		cy.get('select:invalid').should('have.length',1);
		cy.get('.actions input[type="submit"]').click();
		
		cy.get('select[name="year"]').select(cardData.year);
		cy.get('select:invalid').should('have.length',0);
		
		cy.get('.actions input[type="submit"]').click().then(()=>{
			expect(stub.getCall(0)).to.be.calledWith('please fill all fields');
		});
		
	});	
//	const stub = cy.stub;
//	cy.on ('window:alert', stub );
	
		
});



















