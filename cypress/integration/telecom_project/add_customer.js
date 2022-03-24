describe("add customer page", () => {
	beforeEach(() => {
    	cy.visit('https://demo.guru99.com/telecom/addcustomer.php')
 	});
	
//	**** paramtres insertionCustomerValues(1,2): 
//	**** 1 - 0:pending / 1:done
//	**** 2 - array with test "data" : first name, last name, email address, physical address, phone number	
	
	it("correct data", () => {	
//	**** bug on this site, undefinde parameters ****
		Cypress.on('uncaught:exception', (err, runnable) => {
			return false;
		});
		const data = ['Dima','Bomburov','wowa@bomba.com','ulitsa pushkina dom kolotushkina','+79998887766'];
		cy.insertionCustomerValues(0,data);
		cy.submitCorrectDataCustimer();
	}); 
	
	
//	**** for more test with different incorrect data ****
	it("Incorrect data", () => {	
//	**** bug on this site, undefinde parameters ****
		Cypress.on('uncaught:exception', (err, runnable) => {
			return false;
		});		
		const data = ['Dima','Bomburov','wowa@bomba.com','ulitsa pushkina dom kolotushkina','+79998887766'];
		cy.insertionCustomerValues(0,data);
		cy.submitIncorrectDataCustomer();
	}); 
	
	it("Reset button testing", () => {	
//	**** bug on this site, undefinde parameters ****
		Cypress.on('uncaught:exception', (err, runnable) => {
			return false;
		});		
		const data = ['Dima','Bomburov','wowa@bomba.com','ulitsa pushkina dom kolotushkina','+79998887766'];
		cy.insertionCustomerValues(0,data);
		cy.ResetButtonCustomer();
		cy.submitIncorrectDataCustomer();
	}); 	

	it("values out of range", () => {	
//	**** bug on this site, undefinde parameters ****
		Cypress.on('uncaught:exception', (err, runnable) => {
			return false;
		});		
//	**** lenArr - array max valid symbols in fields ****
		const lenArr = [10,10,10,10,12];
//	**** for this test array data contains values out of range ****
		const data = ['AAAAAAAAAAAAAAAAAAAA','AAAAAAAAAAAAAAAAAAAA','AAAAAAAAAAAAAAAAAAAA@bomba.com','ulitsa pushkina dom kolotushkina','+7999888776638752875637256'];
		cy.insertionCustomerValues(0,data);
		cy.OverValuesCustomer(lenArr);
	});
	
});