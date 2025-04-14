const BasePage = require('./BasePage');
const { By } = require('selenium-webdriver');

class PimPage extends BasePage {
    constructor(driver) {
        super(driver);
        this.addEmployeeButton = By.linkText('Add Employee');
        this.employeeListButton = By.linkText('Employee List');
    }

    async clickAddEmployee() {
        await this.click(this.addEmployeeButton);
    }

    async clickEmployeeList() {
        await this.click(this.employeeListButton);
    }
}

module.exports = PimPage;  // Make sure this export exists