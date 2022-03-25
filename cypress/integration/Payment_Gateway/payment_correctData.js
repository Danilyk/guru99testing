describe("add customer page", () => {
	beforeEach(() => {
    	cy.visit('https://demo.guru99.com/payment-gateway/index.php')
 	});
	
	it('payment with correct value', () => {
		cy.GenerateCard().then( credentials => {
//const credentials = ['4660345266401126', '872', '12', '2026', '100.00'];
			cy.get('#nav').contains('a','Cart').click();
			cy.ProductSelection(3);
			cy.InsertionCardData(credentials);	
		});
	});	
});