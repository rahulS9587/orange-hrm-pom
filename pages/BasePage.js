const { until } = require('selenium-webdriver');

class BasePage {
    constructor(driver) {
        this.driver = driver;
    }

    // Add this method to handle navigation
    async navigateTo(url) {
        await this.driver.get(url);
    }

    async click(locator) {
        await this.driver.wait(until.elementLocated(locator), 10000);
        await this.driver.findElement(locator).click();
    }

    async enterText(locator, text) {
        await this.driver.wait(until.elementLocated(locator), 10000);
        await this.driver.findElement(locator).sendKeys(text);
    }
}

module.exports = BasePage;