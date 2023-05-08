const playwright = require('playwright');

const credentials = {
    user: process.env.LT_USERNAME || '<your username>',
    key: process.env.LT_ACCESS_KEY || '<your accessKey>',
};

const capabilities = {
    'browserName': 'Chrome',                   // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    'browserVersion': 'latest',
    'LT:Options': {
        'platform': 'Windows 10',
        'build': 'Playwright Sample Build',
        'name': 'Playwright Sample Test',
        'user': credentials.user,
        'accessKey': credentials.key,
        'network': true,
        'video': true,
        'console': true,
        "smartUIProjectName": "Testing Jest PlayWritght Sample"   //Add the required Smart UI Project name
    }
}

describe('LambdaTest SmartUI Playwright Jest Sample', () => {

    test('Check LambdaTest Homepage Title', async () => {
        const browser = await playwright.chromium.connect({
            wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`,
        });

        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://www.lambdatest.com/');
        const title = await page.title();
        try {
            expect(title).toEqual('Next-Generation Mobile Apps and Cross Browser Testing Cloud | LambdaTest')
            // Mark the test as completed or failed
            await page.evaluate(_ => { }, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: 'Title matched' } })}`)
        } catch {
            await page.evaluate(_ => { }, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'failed', remark: 'Title not matched' } })}`)
        }

        // Add a relevant screenshot name here
        await page.evaluate((_) => { },
            `lambdatest_action: ${JSON.stringify({ action: "smartui.takeScreenshot", arguments: { fullPage: true, screenshotName: "<Your Screenshot Name>" } })}`);

        await browser.close();
    });
});