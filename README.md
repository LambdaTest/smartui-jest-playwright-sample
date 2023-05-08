# LambdaTest SmartUI Playwright Jest Sample

This repository demonstrates how to use Jest and Playwright to run automated tests on LambdaTest's Selenium Grid, using the LambdaTest SmartUI - Visual Regression Testing.

## Prerequisites

Before getting started, make sure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) (v12 or higher)
- [npm](https://www.npmjs.com/get-npm) (v6 or higher)

## Setup

1. Clone the repository:

```bash
git clone https://github.com/LambdaTest/smartui-jest-playwright-sample.git
cd smartui-jest-playwright-sample
```

2. Install the dependencies:

```bash
npm install
```

3. Configure your LambdaTest credentials:

Set the `LT_USERNAME` and `LT_ACCESS_KEY` environment variables with your LambdaTest username and access key, or directly replace `<your username>` and `<your accessKey>` in the `credentials` object in the test file.

```javascript
const credentials = {
    user: process.env.LT_USERNAME || '<your username>',
    key: process.env.LT_ACCESS_KEY || '<your accessKey>',
};
```

## Running the Test

To run the test, execute the following command:

```bash
npx jest
```

This will connect to the LambdaTest Selenium Grid using Playwright and run the test using Jest. The test checks the title of the LambdaTest homepage and takes a screenshot.

## Test Structure

The test file contains the following code snippet:

```javascript
const playwright = require('playwright');
const credentials = {...};
const capabilities = {...};

describe('LambdaTest SmartUI Playwright Jest Sample', () => {
    test('Check LambdaTest Homepage Title', async () => {
        ...
    });
});
```

- `playwright`: The required Playwright library.
- `credentials`: The object containing your LambdaTest username and access key.
- `capabilities`: The object containing the browser and platform configurations and LambdaTest specific options.
- `describe` and `test`: Jest functions to define the test suite and individual tests.

## SmartUI WebHook

Replace with your `Screenshot Name` according to your choice to capture on the SmartUI Dashboard for viewing the results [here](https://smartui.lambdatest.com)

```javascript
// Add a relevant screenshot name here
        await page.evaluate((_) => { },
            `lambdatest_action: ${JSON.stringify({ action: "smartui.takeScreenshot", arguments: { fullPage: true, screenshotName: "<Your Screenshot Name>" } })}`);
```

## Troubleshooting

If you encounter any issues, try running the test with the `--detectOpenHandles` flag to identify any open handles or pending asynchronous operations that may prevent Jest from exiting properly:

```bash
npx jest --detectOpenHandles
```

## Contributing

If you have any suggestions, improvements, or bug fixes, feel free to submit a pull request or create an issue.
