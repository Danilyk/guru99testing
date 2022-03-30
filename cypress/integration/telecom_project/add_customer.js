describe("add customer page", () => {
	beforeEach(() => {
    	cy.visit('https://demo.guru99.com/telecom/addcustomer.php')
 	});
	
	it("correct data", () => {	
//	**** bug on this site, undefinde parameters ****
		Cypress.on('uncaught:exception', (err, runnable) => {
			return false;
		});
		const userData = [0,'Dima','Bomburov','wowa@bomba.com','ulitsa pushkina dom kolotushkina','+79998887766'];
		cy.insertDataCustomer(userData);
		cy.submitDataCustomer();
		cy.validCustomerDataCheck();
	}); 
		
//	**** for more test with different incorrect data ****
	it("Incorrect data", () => {	
//	**** bug on this site, undefinde parameters ****
		Cypress.on('uncaught:exception', (err, runnable) => {
			return false;
		});		
		const userData = ['','1111','Bomburov','wowa@bomba.com','ulitsa pushkina dom kolotushkina','+79998887766'];
		cy.insertDataCustomer(userData);
		cy.submitDataCustomer().then( (stub) => {
			cy.invalidCustomerDataCheck(stub);	
		});		
	}); 
	
	it("Reset button testing", () => {	
//	**** bug on this site, undefinde parameters ****
		Cypress.on('uncaught:exception', (err, runnable) => {
			return false;
		});		
		const userData = ['0','Dima','Bomburov','wowa@bomba.com','ulitsa pushkina dom kolotushkina','+79998887766'];
		cy.insertDataCustomer(userData);
		cy.ResetButtonCustomer();
		cy.submitDataCustomer().then( (stub) => {
			cy.invalidCustomerDataCheck(stub);	
		});
	}); 	

	it("values out of range", () => {	
//	**** bug on this site, undefinde parameters ****
		Cypress.on('uncaught:exception', (err, runnable) => {
			return false;
		});		
//	**** lenArr - array max valid symbols in fields ****
		const maxLengthFields = [10,10,10,10,12];
//	**** for this test array data contains values out of range ****
		const userData = [0,'AAAAAAAAAAAAAAAAAAAA','AAAAAAAAAAAAAAAAAAAA','AAAAAAAAAAAAAAAAAAAA@bomba.com','ulitsa pushkina dom kolotushkina','+7999888776638752875637256'];
		cy.insertDataCustomer(userData);
		cy.OverValuesCustomer(maxLengthFields);
	});	
});