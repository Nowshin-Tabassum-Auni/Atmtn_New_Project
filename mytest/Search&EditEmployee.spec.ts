/* eslint-disable playwright/no-wait-for-timeout */
import { test, expect } from "@playwright/test";
import { login } from "../helpers/auth";
import { generateRandomEmployeeData } from "../helpers/dataGenerator";
import path from "path";

test.use({
    launchOptions: { slowMo: 2000 },
});

test.describe("OrangeHRM Edit Employee Testing", () => {
    test("Search & Edit Employee", async ({ page }) => {
        // Login
        await login(page);

        // Generate random employee data
        const employee = generateRandomEmployeeData();

        // Navigate to PIM → Add Employee
        await page.getByRole("link", { name: "PIM" }).click();
        await page.getByRole("link", { name: "Add Employee" }).click();

        // Create an employee
        await page.getByPlaceholder("First Name").fill(employee.firstName);
        await page.getByPlaceholder("Last Name").fill(employee.lastName);
        await page.getByRole("button", { name: "Save" }).click();

        // Navigate to Employee List → Search
        await page.getByRole("link", { name: "Employee List" }).click();
        await page
            .getByPlaceholder("Type for hints...")
            .first()
            .fill(employee.firstName);
        await page.getByRole("button", { name: "Search" }).click();
        await page.evaluate(() => window.scrollBy(0, 50));
        await page.screenshot({ path: "test-results/SearchEmployee.png" });

        //Edit the employee
        await page.getByRole("button", { name: "" }).first().click();
        await page
            .locator("div")
            .filter({ hasText: /^Driver's License NumberLicense Expiry Date$/ })
            .getByRole("textbox")
            .first()
            .fill("DL88857260");
        await page
            .locator("form")
            .filter({ hasText: "Employee Full NameEmployee" })
            .getByRole("button")
            .click();

        // Verify employee is updated
        await expect
            .soft(
                page.getByRole("heading", {
                    name: `${employee.firstName} ${employee.lastName}`,
                }),
            )
            .toBeVisible();
        // Screenshot
        await page.waitForTimeout(3000);
        await page.screenshot({ path: "test-results/EditEmployee.png" });
    });
});
