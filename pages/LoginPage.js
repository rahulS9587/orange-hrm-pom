const BasePage = require('./BasePage');
const { By } = require('selenium-webdriver');

class LoginPage extends BasePage {
    constructor(driver) {
        super(driver);
        this.usernameField = By.name('username');
        this.passwordField = By.name('password');
        this.loginButton = By.css('button[type="submit"]');
    }

    async open() {
        // Now using the properly inherited navigateTo method
        await this.navigateTo('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    }

    async login(username, password) {
        await this.enterText(this.usernameField, username);
        await this.enterText(this.passwordField, password);
        await this.click(this.loginButton);
    }
}

module.exports = LoginPage;