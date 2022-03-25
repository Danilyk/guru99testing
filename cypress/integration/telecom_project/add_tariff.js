describe("add tariff plans page", () => {
	beforeEach(() => {
    cy.visit('https://demo.guru99.com/telecom/addtariffplans.php')
 	});
	
	it("correct data", () => {			
		cy.insertionValues('11111');
		cy.submitCorrectData();	
	}); 
	
	it("values out of range", () => {	
		const lenArr = [5,5,5,5,3,3,3];
		cy.insertionValues('1111111111');
		cy.OverValues(lenArr);
	});

	it("special chars", () => {			
		cy.insertionValues('1@@@1');
		cy.submitIncorrectData();
	});
	
	it("empty value", () => {			
		cy.insertionValues(' ');
		cy.submitIncorrectData();
	});

	it("chars", () => {			
		cy.insertionValues('wwwww');
		cy.submitIncorrectData();
	});

	it("negative numbers", () => {			
		cy.insertionValues('-2000');
		cy.submitIncorrectData();
	});

	it("reset button", () => {			
		cy.insertionValues('123');
		cy.ResetButton();
		cy.submitIncorrectData();
	});
	
	it("difference incorrect data", () => {			
		cy.oneInsertionValues('22222','0','1@W#$');
		cy.submitIncorrectData();	
	}); 
	it("difference incorrect data", () => {			
		cy.oneInsertionValues('22222','1','1@W#$');
		cy.submitIncorrectData();	
	}); 
	it("difference incorrect data", () => {			
		cy.oneInsertionValues('22222','2','1@W#$');
		cy.submitIncorrectData();	
	}); 
	it("difference incorrect data", () => {			
		cy.oneInsertionValues('22222','3','1@W#$');
		cy.submitIncorrectData();	
	}); 
		it("difference incorrect data", () => {			
		cy.oneInsertionValues('22222','4','1@W#$');
		cy.submitIncorrectData();	
	}); 
	it("difference incorrect data", () => {			
		cy.oneInsertionValues('22222','5','1@W#$');
		cy.submitIncorrectData();	
	}); 
	it("difference incorrect data", () => {			
		cy.oneInsertionValues('22222','6','1@W#$');
		cy.submitIncorrectData();	
	}); 
	
	
	
	
});
