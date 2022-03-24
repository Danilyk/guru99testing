describe("add customer page", () => {
	beforeEach(() => {
    	cy.visit('https://demo.guru99.com/telecom/addcustomer.php')
 	});
	
	it("correct data", () => {		
		const arr = ['firstName', 'lastName', 'phone'];
		cy.insertionCustomerValues(0,arr,'wowa@bomba.com','pushkina dom kolotushkina');
		
//		cy.insertionValues('11111');
//		cy.submitCorrectData();	
	}); 
});