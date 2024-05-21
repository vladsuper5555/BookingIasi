const puppeteer = require("puppeteer");
const { expect } = require("@jest/globals");
const { faker } = require("@faker-js/faker");

describe("Signup and Login Test", () => {
  let browser;
  let page;
  const baseURL = "http://localhost:5173";
  const sportsOptions = [
    "running",
    "football",
    "basketball",
    "tennis",
    "volleyball",
    "handball",
    "swimming",
    "going to the gym",
    "something else",
  ];
  const userData = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    username: faker.internet.displayName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    height: String(faker.datatype.number({ min: 150, max: 200 })), // Height in cm
    weight: String(faker.datatype.number({ min: 50, max: 120 })), // Weight in kg
    gender: faker.helpers.arrayElement(["Male", "Female", "Other"]),
    specialAssistance: faker.datatype.boolean(),
    walkFrequency: faker.helpers.arrayElement([
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
    ]),
    walkDistance: faker.datatype
      .number({ min: 0.5, max: 20, precision: 0.1 })
      .toString(), // Random walk distance between 0.5 and 20 km
    sportsPracticed: faker.helpers.arrayElements(
      sportsOptions,
      faker.datatype.number({ min: 0, max: sportsOptions.length })
    ), // Randomly select sports
    sportsFrequency: {},
    sportsIntensity: {},
  };

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  it("should sign up a new user and display a response message", async () => {
    await page.goto(`${baseURL}/signup`);

    await page.type("#First_Name", userData.firstName);
    await page.type("#Last_Name", userData.lastName);
    await page.type("#Username", userData.username);
    await page.type("#email", userData.email);
    await page.type("#password", userData.password);

    await page.click("#submit");
    await page.waitForNetworkIdle({ idleTime: 300 });

    // const responseMessage = await page.$eval('#responseMessage', el => el.textContent);
    // expect(responseMessage).toBeTruthy();
    const birthDate = faker.date.birthdate({ min: 18, max: 65, mode: "age" });
    const formattedBirthDate = `${
      birthDate.getMonth() + 1
    }/${birthDate.getDate()}/${birthDate.getFullYear()}`;
    await page.type("#Birth_Date", formattedBirthDate);
    await page.type("#height", userData.height);
    await page.type("#weight", userData.weight);
    await page.type("#gender", userData.gender);
    await page.$eval(
      "#Special_Assistance",
      (checkbox, specialAssistance) => {
        if (specialAssistance) {
          checkbox.checked = true; // If specialAssistance is true, check the checkbox
        } else {
          checkbox.checked = false; // If specialAssistance is false, uncheck the checkbox
        }
      },
      userData.specialAssistance
    );
    // const walkFrequency = faker.datatype.number({ min: 1, max: 7 }).toString(); // Random walk frequency between 1 and 7
    // await page.select('#walkFrequency', walkFrequency);

    // await page.select('#walkFrequency', userData.walkFrequency);

    await page.type("#walkDistance", userData.walkDistance);

    // for (const sport of userData.sportsPracticed) {
    //   await page.click(`input[value="${sport}"]`); // Check the sport checkbox

    //   await page.select(`#${sport}_frequency`, userData.sportsFrequency[sport]);
    //   await page.select(`#${sport}_intensity`, userData.sportsIntensity[sport]);
    // }

    await page.click("#save-btn");
    await page.waitForNetworkIdle({ idleTime: 2000 });

    const responseMessage = page.url();
    // console.log(responseMessage);
    expect(responseMessage == "http://localhost:5173/health-form").toBeTruthy();
  });
});
