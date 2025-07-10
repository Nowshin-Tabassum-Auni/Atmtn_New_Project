/* eslint-disable quotes */
import { test, expect, chromium } from "@playwright/test";
import { login } from "../helpers/auth"; // Import reusable login function

test.describe("OrangeHRM Login Testing", () => {
    test("OrangeHRMLogin", async ({ page }) => {
        // Launch browser
        /*const browser = await chromium.launch({
            headless: false, // Show browser UI
            slowMo: 2000, // Slow down actions by 2s
        });*/

        await login(page);

        // Verify the page title
        await expect.soft(page).toHaveTitle("OrangeHRM");

        // Verify the URL contains "/dashboard"
        await expect.soft(page).toHaveURL(/dashboard/);

        // Take a screenshot after login
        await page.screenshot({ path: "test-results/OrangeHRMLogin.png" });

        // Click the user dropdown and logout
        await page.locator("span.oxd-userdropdown-tab").click();
        await page.locator('a[href="/web/index.php/auth/logout"]').click();

        // Verify redirect back to login page
        await expect
            .soft(page)
            .toHaveURL(
                "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
            );

        // Take a screenshot after logout
        await page.screenshot({ path: "test-results/OrangeHRMLogout.png" });

        // Close the browser
        //await browser.close();
    });
});
