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
        // Login
        await login(page);

        // Navigate to the Add Employee page
        await page.goto(
            "https://opensource-demo.orangehrmlive.com/web/index.php/pim/addEmployee",
        );

        // Fill in employee details
        await page.getByPlaceholder("First name").fill("Nowshin");
        await page.getByPlaceholder("Middle name").fill("T");
        await page.getByPlaceholder("Last name").fill("Auni");

        // Generate a random employee ID
        const employeeId = Math.floor(1000 + Math.random() * 9000).toString();
        await page.getByPlaceholder("Employee Id").fill(employeeId);

        // Click the Save button
        await page.getByRole("button", { name: "Save" }).click();

        // Verify employee is added (adjust selector if needed)
        await expect.soft(page.getByText("Successfully Saved")).toBeVisible();

        // Screenshot
        await page.screenshot({ path: "test-results/AddEmployee.png" });
    });
});
