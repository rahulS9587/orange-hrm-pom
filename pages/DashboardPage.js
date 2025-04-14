const BasePage = require('./BasePage');
const { By, until } = require('selenium-webdriver');
const { Actions } = require('selenium-webdriver');

class DashboardPage extends BasePage {
    constructor(driver) {
        super(driver);
        // Updated locators for OrangeHRM 4.0+
        this.pimMenu = By.xpath("//a[contains(@href,'viewPimModule')]");
        this.addEmployeeMenu = By.linkText('Add Employee');
    }

    async navigateToPIM() {
        try {
            // Wait for menu to be present and visible
            const element = await this.driver.wait(
                until.elementLocated(this.pimMenu),
                10000
            );
            await this.driver.wait(
                until.elementIsVisible(element),
                10000
            );
            
            // Scroll into view if needed
            await this.driver.executeScript(
                "arguments[0].scrollIntoView(true);",
                element
            );
            
            // Use actions to hover and click
            await new Actions(this.driver)
                .moveToElement(element)
                .pause(1000)
                .click()
                .perform();
        } catch (error) {
            console.error('Error navigating to PIM:', error);
            throw error;
        }
    }
}

module.exports = DashboardPage;