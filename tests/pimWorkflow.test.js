const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

describe('OrangeHRM PIM Workflow Tests', () => {
    let driver;

    beforeAll(async () => {
        const options = new chrome.Options();
        // options.addArguments('--headless');
        options.addArguments('--window-size=1920,1080');
        
        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();

        const LoginPage = require('../pages/LoginPage');
        const loginPage = new LoginPage(driver);
        
        await loginPage.open();
        await loginPage.login('Admin', 'admin123');
        
        // Updated Dashboard verification
        try {
            // Try multiple possible dashboard indicators
            const dashboardIndicators = [
                By.xpath("//h6[contains(., 'Dashboard')]"),
                By.css("h6.oxd-text"),
                By.xpath("//span[contains(., 'Dashboard')]")
            ];
            
            for (const locator of dashboardIndicators) {
                try {
                    await driver.wait(until.elementLocated(locator), 5000);
                    console.log(`Found dashboard using: ${locator.toString()}`);
                    break;
                } catch (e) {
                    continue;
                }
            }
        } catch (error) {
            // Take screenshot if dashboard not found
            const screenshot = await driver.takeScreenshot();
            require('fs').writeFileSync('dashboard_error.png', screenshot, 'base64');
            throw new Error('Dashboard not loaded after login. Screenshot saved.');
        }
    });

    test('Add employee test', async () => {
        const DashboardPage = require('../pages/DashboardPage');
        const PimPage = require('../pages/PimPage');
        const AddEmployeePage = require('../pages/AddEmployeePage');
        
        const dashboardPage = new DashboardPage(driver);
        const pimPage = new PimPage(driver);
        const addEmployeePage = new AddEmployeePage(driver);
        
        await dashboardPage.navigateToPIM();
        
        // Wait for PIM header
        await driver.wait(until.elementLocated(
            By.xpath("//h6[contains(., 'PIM')]")), 
            10000
        );
        
        await pimPage.clickAddEmployee();
        
        await addEmployeePage.addEmployee(
            'Test', 
            'M', 
            `User${Date.now()}`
        );
        
        // Verify success message
        await driver.wait(until.elementLocated(
            By.xpath("//p[contains(., 'Success')]")),
            10000
        );
    });

    afterAll(async () => {
        if (driver) {
            await driver.quit();
        }
    });
});