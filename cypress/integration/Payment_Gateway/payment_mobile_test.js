describe( 'page display on medium size screen', () => {
	beforeEach(() => {
    	cy.visit('https://demo.guru99.com/payment-gateway/index.php')
 	});
	
	it('burger menu', () => {
		if 
		cy.viewport(980, 540);
		cy.get('.fa-bars').click();
		cy.get('#navPanel').contains('a','Generate Card Number').invoke('removeAttr', 'target').click();
		cy.contains('h2','Here is your New Card');
	});
	
	it('normal menu', () => {
		cy.viewport(1200, 960);
		cy.contains('a','Generate Card Number').invoke('removeAttr', 'target').click();
		cy.contains('h2','Here is your New Card');
	});	
	
});