const puppeteer = require('puppeteer');

describe('Google Homepage', () => {
  it('should have a title "Google"', async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.google.com');
    const title = await page.title();
    expect(title).toBe('Google');
    await browser.close();
  });
});
