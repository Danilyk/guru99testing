describe("add tariff plans page", () => {
	beforeEach(() => {
    cy.visit('https://demo.guru99.com/telecom/addtariffplans.php')
 	});
	
	it("correct data", () => {			
		cy.insertTariffData('11111');
		cy.submitTariffData;
		cy.correctDataCheck;
	}); 
	
	it("values out of range", () => {	
		const arrayMaxLength = [5,5,5,5,3,3,3];
		cy.insertTariffData('1111111111');
		cy.OverTariffValues(arrayMaxLength);
	});

	it("special chars", () => {			
		cy.insertTariffData('1@@@1');
		cy.submitTariffData().then((stub)=>{
			cy.incorrectDataCheck(stub);
		}); 
		
	});
	
	it("empty value", () => {			
		cy.insertTariffData(' ');
		cy.submitTariffData().then((stub) => {
			cy.incorrectDataCheck(stub);
		});
	});

	it("chars", () => {			
		cy.insertTariffData('wwwww');
		cy.submitTariffData().then((stub) => {
			cy.incorrectDataCheck(stub);
		});
	});

	it("negative numbers", () => {			
		cy.insertTariffData('-2000');
		cy.submitTariffData().then((stub) => {
			cy.incorrectDataCheck(stub);
		});
	});

	it("reset button", () => {			
		cy.insertTariffData('123');
		cy.ResetButton();
		cy.submitTariffData().then((stub) => {
			cy.incorrectDataCheck(stub);
		});
	});
	
	it("difference incorrect data", () => {			
		cy.insertOneInvalidTariffValues('22222','0','1@W#$');
		cy.submitTariffData().then((stub) => {
			cy.incorrectDataCheck(stub);
		});	
	}); 
	it("difference incorrect data", () => {			
		cy.insertOneInvalidTariffValues('22222','1','1@W#$');
		cy.submitTariffData().then((stub) => {
			cy.incorrectDataCheck(stub);
		});	
	}); 
	it("difference incorrect data", () => {			
		cy.insertOneInvalidTariffValues('22222','2','1@W#$');
		cy.submitTariffData().then((stub) => {
			cy.incorrectDataCheck(stub);
		});	
	}); 
	it("difference incorrect data", () => {			
		cy.insertOneInvalidTariffValues('22222','3','1@W#$');
		cy.submitTariffData().then((stub) => {
			cy.incorrectDataCheck(stub);
		});	
	}); 
		it("difference incorrect data", () => {			
		cy.insertOneInvalidTariffValues('22222','4','1@W#$');
		cy.submitTariffData().then((stub) => {
			cy.incorrectDataCheck(stub);
		});	
	}); 
	it("difference incorrect data", () => {			
		cy.insertOneInvalidTariffValues('22222','5','1@W#$');
		cy.submitTariffData().then((stub) => {
			cy.incorrectDataCheck(stub);
		});	
	}); 
	it("difference incorrect data", () => {			
		cy.insertOneInvalidTariffValues('22222','6','1@W#$');
		cy.submitTariffData().then((stub) => {
			cy.incorrectDataCheck(stub);
		});	
	}); 
	
	
	
	
});
