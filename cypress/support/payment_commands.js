//-------------------- <<<< START!!!   PAYMENT GATEWAY >>>> ----------------------

// ----------------------<< generate new card data >>-------------------------
import { isMobile } from "./utils";

Cypress.Commands.add('generateCard', (array) => {
	
	if ( isMobile() ) {
		cy.get('.navPanelToggle').click();
		cy.get('#navPanel').contains('a','Generate Card Number').invoke('removeAttr', 'target').click();
	} else {
		cy.contains('a','Generate Card Number').invoke('removeAttr', 'target').click();
	}
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
	if ( isMobile() ) {
		cy.get('.fa-bars').click();
		cy.get('#navPanel').contains('a','Cart').click();
	} else {
		cy.contains('#nav a','Cart').click();
	}

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
	if ( isMobile() ) {
		cy.get('.fa-bars').click();
		cy.get('#navPanel').contains('a','Check Credit Card Limit').click();
	} else {
		cy.contains('#nav a','Check Credit Card Limit').click();
	}
	cy.get('input[name="card_nmuber"]').type(cardNum);
	cy.get('input[value="submit"]').click();
	cy.contains('h4', 'Credit Card Balance')
		.get('span')
		.invoke('text')
		.then( cardBalance => {
			return cy.wrap(cardBalance);
		});
});	

Cypress.Commands.add('checkPaymentFormField', (cardData) => {
	
	const cvvField = 'input[name="cvv_code"]',
		  numField = 'input[name="card_nmuber"]',
		  submitButton = '.actions input[type="submit"]',
		  longInvalidNumber = 12345678901234567890;	
	let i = 0;
	cy.get(cvvField)
	.then(($el)=>{
		$el.prop('required',true);
	});
	
	cy.get('form[name="fbal"]').within( () => {
		let stub = cy.stub();
		cy.on ('window:alert', stub );
		
		cy.get('select:invalid').should('have.length',2);
		cy.get(submitButton).click();
		cy.get('select[name="month"]').select(cardData.month);
		
		cy.get('select:invalid').should('have.length',1);
		cy.get(submitButton).click();		
		cy.get('select[name="year"]').select(cardData.year);
		
		cy.get('select:invalid').should('have.length',0);
		
		cy.get('input:invalid').should('have.length',1);
		checkMaxFieldLength(cvvField,3,'not clear after end');
		cy.get('input:invalid').should('have.length',0);
				
		cy.get(submitButton).click().then(()=>{
			expect(stub.getCall(0)).to.be.calledWith('Check card number is 16 digits!');
		});
		
		checkMaxFieldLength(numField,16,'clear after end');
		
		checkMinInvalidValues('card number', 16, cardData.cardNumber, numField);
		
		cy.get(cvvField).clear();

		checkMinInvalidValues('cvv code', 3, cardData.cvvCode, cvvField);
		

		cy.get(submitButton).click();
		
		function checkMaxFieldLength(field, len, clear) {
			cy.get(field)
			.type(longInvalidNumber)
			.then( (fieldInner) => {
				cy.get(fieldInner).invoke('val').should('have.length', len);
				if (clear == 'clear after end'){
					cy.get(fieldInner).clear();			
				}
			});
		};		

		function checkMinInvalidValues(textForAlert, maxLength, initialValue, field) {
			cy.get(field).then( fieldInner => {	
				if( i < (maxLength - 1) ){
					let currentValue = initialValue.slice(i,i+1);
					cy.get(fieldInner).type(currentValue);
					i++;
					cy.get(submitButton).click()
						.then(()=>{
							expect(stub.getCall(0))
							.to.be.calledWith(`Check ${textForAlert} is ${maxLength} digits!`);		
						});
					checkMinInvalidValues(textForAlert, maxLength, initialValue, field);
				}
				else if(i == (maxLength - 1)){
					cy.log(`lingth string - ${i+1}`);
					let currentValue = initialValue.slice(i,i+1);
					cy.get(fieldInner).type(currentValue);
					cy.log(currentValue);
					i=0;
				}
			});	
		};
	});		
});


