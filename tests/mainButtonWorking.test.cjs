const puppeteer = require('puppeteer');

describe('Main Button For Finding Group ID', () => {
  it('Should display content in the div after button click', async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    // Navigate to your target page
    await page.goto('http://localhost:5173');

    // Click the button with the id 'afla_grupa'
    await page.click('#afla_grupa');

    // Wait for all fetches to finish. 'networkidle0' waits until there are no more than 0 network connections for at least 500 ms.
    // await page.waitForNavigation({waitUntil: 'networkidle0'}); // seems to be failing even if documentation says is good....
    await page.waitForNetworkIdle({ idleTime: 300 }) // this waits 300 ms from the last network interaction that should be enough to see if we got the response and also implemented it
    console.log('notwork done');
    // Test if the div with the id 'content' contains anything. This code checks if the 'content' div is not empty.
    const isContentNotEmpty = await page.evaluate(() => {
        const contentDiv = document.querySelector('#content');
        return contentDiv && contentDiv.innerHTML.trim().length > 0;
    });

    // Use expect to assert that the content is not empty.
    expect(isContentNotEmpty).toBeTruthy();

    await browser.close();
  });
});
