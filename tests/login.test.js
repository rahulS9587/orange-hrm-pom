const { Builder, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

// Set global timeout
jest.setTimeout(30000);

describe('OrangeHRM Login Tests', () => {
    let driver;
    let loginPage;
    let dashboardPage;

    beforeAll(async () => {
        try {
            // Set Chrome options
            const options = new chrome.Options();
            
            // If running in CI or headless mode
            // options.addArguments('--headless');
            // options.addArguments('--disable-gpu');
            
            // Specify exact Chrome binary path if needed
            // options.setChromeBinaryPath('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome');
            
            driver = await new Builder()
                .forBrowser('chrome')
                .setChromeOptions(options)
                .build();
                
            loginPage = new LoginPage(driver);
            dashboardPage = new DashboardPage(driver);
        } catch (error) {
            console.error('Error during setup:', error);
            throw error;
        }
    });

    afterAll(async () => {
        if (driver) {
            await driver.quit();
        }
    });

    test('Successful login with valid credentials', async () => {
        await loginPage.open();
        await loginPage.login('Admin', 'admin123');
        
        const title = await driver.getTitle();
        expect(title).toContain('Dashboard');
        
        await dashboardPage.logout();
    });
});