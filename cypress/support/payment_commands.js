//-------------------- <<<< START!!!   PAYMENT GATEWAY >>>> ----------------------
Cypress.Commands.add('GenerateCard', (array) => {
	cy.contains('a','Generate Card Number').invoke('removeAttr', 'target').click();
	cy.contains('h2','Here is your New Card');
	var cardDataArr = [];
	cy.get('.inner > h4')
		.each( ($els, i) => {
			cy.get($els).invoke('text').then( innerText => {
				(i==0 || i==1) ? 
					(cardDataArr[i] = innerText.split('-')[1].trim()) :
				i==2 ? 
					(cardDataArr[i] = innerText.split('-')[1].split('/')[0].trim(),
					cardDataArr[i+1] = innerText.split('-')[1].split('/')[1].trim()) : 
				i==3 ?
					(cardDataArr[i+1] = innerText.split('$')[1].trim()) :
				false;
			});	
	});
	return cy.wrap(cardDataArr);
});

Cypress.Commands.add('ProductSelection', (quant) => {
	cy.get('select[name="quantity"]').select(quant);
	cy.get('input[value="Buy Now"]').click();
});
Cypress.Commands.add('InsertionCardData', ( cardData ) => {
	cy.get('input[type="text"]').each( (el, i) => { 
		cy.get(el).scrollIntoView().should("be.visible").type(cardData[i])
	});
	cy.get('.select-wrapper > select').each( (el, i) => {
		cy.get(el).scrollIntoView().should("be.visible").select(cardData[i+2]);
	});
	cy.get('.actions input[type="submit"]').click();
	cy.contains('h2','Payment successfull!');
});
