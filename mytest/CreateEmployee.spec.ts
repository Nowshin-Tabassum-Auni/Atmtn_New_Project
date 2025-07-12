/* eslint-disable quotes */
import { test, expect } from "@playwright/test";
import { login } from "../helpers/auth";
import { generateRandomEmployeeData } from "../helpers/dataGenerator";

test.use({
    launchOptions: { slowMo: 2000 },
});

test.describe("OrangeHRM Add Employee Testing", () => {
    test("Create Employee", async ({ page }) => {
        // Login
        await login(page);

        // Generate random employee data
        const employee = generateRandomEmployeeData();

        // Navigate via PIM → Add Employee
        await page.getByRole("link", { name: "PIM" }).click();
        await page.getByRole("link", { name: "Add Employee" }).click();

        // Fill in employee details
        await page.getByPlaceholder("First Name").fill(employee.firstName);
        await page.getByPlaceholder("Middle Name").fill(employee.middleName);
        await page.getByPlaceholder("Last Name").fill(employee.lastName);

        // Enable "Create Login Details" toggle
        await page.locator("form span").first().click();
        // eslint-disable-next-line playwright/no-page-pause

        // Fill in Username, Password, and Confirm Password
        const usernameInput = page.locator(
            "div:nth-child(4) > .oxd-grid-2 > div > .oxd-input-group > div:nth-child(2) > .oxd-input",
        );
        await usernameInput.fill(employee.username);
        await page
            .locator('input[type="password"]')
            .first()
            .fill(employee.password);
        await page
            .locator('input[type="password"]')
            .nth(1)
            .fill(employee.password);

        // Save
        await page.getByRole("button", { name: "Save" }).click();

        // Verify employee is added
        await expect
            .soft(
                page.getByRole("heading", {
                    name: `${employee.firstName} ${employee.lastName}`,
                }),
            )
            .toBeVisible();

        // Screenshot
        await page.screenshot({ path: "test-results/AddEmployee.png" });
    });
});
