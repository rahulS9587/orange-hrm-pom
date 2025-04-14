const BasePage = require('./BasePage');
const { By } = require('selenium-webdriver');

class AddEmployeePage extends BasePage {
    constructor(driver) {
        super(driver);
        this.firstNameField = By.name('firstName');
        this.middleNameField = By.name('middleName');
        this.lastNameField = By.name('lastName');
        this.saveButton = By.css('button[type="submit"]');
    }

    async addEmployee(firstName, middleName, lastName) {
        await this.enterText(this.firstNameField, firstName);
        await this.enterText(this.middleNameField, middleName);
        await this.enterText(this.lastNameField, lastName);
        await this.click(this.saveButton);
    }
}

// This is the critical line - must be exactly like this
module.exports = AddEmployeePage;