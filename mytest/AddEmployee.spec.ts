import { test, expect } from "@playwright/test";
import { login } from "../helpers/auth";

test.use({
    launchOptions: {
        slowMo: 3000, // Slow down each action by 3 second
        headless: false, // Show browser UI
    },
});

test.describe("OrangeHRM Add Employee Testing", () => {
    test("Add Employee", async ({ page }) => {
        // Login first
        await login(page);

        // Navigate to the Add Employee page
        await page.goto(
            "https://opensource-demo.orangehrmlive.com/web/index.php/pim/addEmployee",
        );

        // Fill in employee details
        await page.getByRole("textbox", { name: "First Name" }).fill("Nowshin");
        await page.getByRole("textbox", { name: "Last Name" }).fill("T Auni");

        // Click the Save button
        await page.getByRole("button", { name: "Save" }).click();

        // Verify employee is added (adjust selector if needed)
        await expect.soft(page.getByText("Successfully Saved")).toBeVisible();

        // Screenshot
        await page.screenshot({ path: "test-results/AddEmployee.png" });
    });
});
