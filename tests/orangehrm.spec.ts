/* eslint-disable quotes */
/* eslint-disable playwright/prefer-locator */
import { test, expect } from "@playwright/test";

test.describe("OrangeHRM Demo Tests", () => {
    const baseURL = "https://opensource-demo.orangehrmlive.com/";

    test("Login and verify dashboard", async ({ page }) => {
        // Go to OrangeHRM demo site
        await page.goto(baseURL);

        // Enter username
        await page.fill('input[name="username"]', "Admin");

        // Enter password
        await page.fill('input[name="password"]', "admin123");

        // Click login button
        await page.click('button[type="submit"]');

        // Wait for dashboard to load and verify URL
        await expect.soft(page).toHaveURL(/dashboard/);

        // Verify dashboard header is visible
        await expect
            .soft(page.getByRole("heading", { name: "Dashboard" }))
            .toBeVisible();

        // Optional: logout
        await page.click("span.oxd-userdropdown-tab");
        await page.click('a[href="/web/index.php/auth/logout"]');
        await expect.soft(page).toHaveURL(baseURL);
    });
});
