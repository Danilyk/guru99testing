describe("add customer page", () => {
	beforeEach(() => {
    	cy.visit('https://demo.guru99.com/payment-gateway/index.php')
 	});
	

	
	it('payment with correct card data', () => {
		cy.generateCard().then( cardData => {
//const credentials = ['4660345266401126', '872', '12', '2026', '100.00'];
			cy.selectProductInCart(3);
			cy.insertCardData(cardData);
			cy.correctPaymentCheck();
		});
	}); 
	
	it('payment with INcorrect card data', () => {
		const cardData = {
			cardNumber: '1111111111111111',
			cvvCode: '111',
			month: '01',
			year: '2026',
			money: '100.00'
		}
//		const cardData = ['1111111111111111', '111', '01', '2026', '100.00'];
		cy.selectProductInCart(3);
		cy.insertCardData(cardData);
		cy.incorrectPaymentCheck();
	});
	
	it('verification of debiting money from a bank card', () => {
		cy.generateCard().then( cardData => {
//const credentials = ['4660345266401126', '872', '12', '2026', '100.00'];
			cy.selectProductInCart('1');
			cy.insertCardData(cardData);
			cy.correctPaymentCheck();
			cy.checkCardBalance(cardData.cardNumber).then( initialBalance => {
				cy.selectProductInCart('2');
				cy.contains('font', '$').invoke('text').then( (val) =>{
					let amount = val.slice(0, -3).replace('$','');
					cy.insertCardData(cardData);
					cy.correctPaymentCheck();
					cy.checkCardBalance(cardData.cardNumber).then( currentBalance => {
						expect(parseInt(initialBalance)).to.be.equal(parseInt(currentBalance) + parseInt(amount));
					});
				});
			});	
		});
	});
	
	it('check fields on payment form', () => {
		const cardData = {
			cardNumber: '4660345266401126',
			cvvCode: '872',
			month: '12',
			year: '2026',
			money: '100.00'
		};
//		const cardData = ['1111111111111111', '111', '01', '2026', '100.00'];
		cy.selectProductInCart(3);
		cy.checkPaymentFormField(cardData);
		cy.correctPaymentCheck();
	});
	
});