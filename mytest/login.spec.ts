import { test, expect, Browser, Page, Locator } from "@playwright/test";
import { firefox, chromium } from "playwright";

test.describe("OrangeHRM Login", () => {
    test("Login Test", async () => {
        //Open Browser
        const brow: Browser = await chromium.launch({ headless: false });
        //Open Page
        const page: Page = await brow.newPage();
        //Go to the URL
        await page.goto(
            "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
        );
        //Create 3 Locators: Username, Password, Login Button
        const username: Locator = page.getByRole("textbox", {
            name: "Username",
        });
        const password: Locator = page.locator("#Password");
        const loginButton: Locator = page.locator("value=Login]");
        //Enter Username, Password and Click Login Button
        await username.fill("Admin");
        await password.fill("admin123");
        await loginButton.click();
        //Verify the Title
        const pageTitle = await page.title();
        console.log("NTA's Page Title: ", pageTitle);
        expect.soft(pageTitle).toBe("OrangeHRM");
        //Take a Screenshot
        await page.screenshot({ path: "/test-results/OrangeHRMLogin.png" });
        //Close the Browser
        await brow.close();
    });
});
