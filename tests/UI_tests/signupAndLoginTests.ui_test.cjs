const puppeteer = require('puppeteer');
const { expect } = require('@jest/globals');
const { faker } = require("@faker-js/faker");


describe('Signup and Login Test', () => {
  let browser;
  let page;
  const baseURL = 'http://localhost:5173';
  const userData = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    username: faker.internet.displayName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  it('should sign up a new user and display a response message', async () => {
    await page.goto(`${baseURL}/signup`);

    await page.type('#First_Name', userData.firstName);
    await page.type('#Last_Name', userData.lastName);
    await page.type('#Username', userData.username);
    await page.type('#email', userData.email);
    await page.type('#password', userData.password);

    await page.click('#submit');
    await page.waitForNetworkIdle({ idleTime: 300 });

    const responseMessage = await page.$eval('#responseMessage', el => el.textContent);
    expect(responseMessage).toBeTruthy();
  });

  it('should log in with the same credentials and display a response message', async () => {
    await page.goto(`${baseURL}/login`);

    await page.type('#username', userData.username);
    await page.type('#password', userData.password);

    await page.click('#submit');
    await page.waitForNetworkIdle({ idleTime: 300 });

    const responseMessage = await page.$eval('#responseMessage', el => el.textContent);
    expect(responseMessage).toBeTruthy();
  });
});
