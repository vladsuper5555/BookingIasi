const puppeteer = require('puppeteer');

describe('Main Button For Finding Group ID', () => {
  it('Should display content in the div after button click', async () => {
    // const browser = await puppeteer.launch({headless: false}); // never launch in non headless mode -> github blocks interaction 
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate to your target page
    await page.goto('http://localhost:5173');

    // Click the button with the id 'afla_grupa'
    await page.click('#connect');

    // Wait for all fetches to finish. 'networkidle0' waits until there are no more than 0 network connections for at least 500 ms.
    // await page.waitForNavigation({waitUntil: 'networkidle0'}); // seems to be failing even if documentation says is good....
    await page.waitForNetworkIdle({ idleTime: 300 }) // this waits 300 ms from the last network interaction that should be enough to see if we got the response and also implemented it
    // Test if the div with the id 'content' contains anything. This code checks if the 'content' div is not empty.
    const isWebpageCorrect = page.url() == 'http://localhost:5173/login';
    // Use expect to assert that the content is not empty.
    expect(isWebpageCorrect).toBeTruthy();
    ;

    await browser.close();
  });
});
