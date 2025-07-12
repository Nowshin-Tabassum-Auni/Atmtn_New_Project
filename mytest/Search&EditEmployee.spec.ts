import { test, expect } from "@playwright/test";
import { login } from "../helpers/auth";
import { generateRandomEmployeeData } from "../helpers/dataGenerator";

test.use({
    launchOptions: { slowMo: 2000 },
});

test.describe("OrangeHRM Edit Employee Testing", () => {
    test("Search & Edit Employee", async ({ page }) => {
        // Login
        await login(page);

        // Generate random employee data
        const employee = generateRandomEmployeeData();

        // Navigate via PIM → Add Employee
        await page.getByRole("link", { name: "PIM" }).click();
        await page.getByRole("link", { name: "Add Employee" }).click();
        // Create an employee
        await page.getByPlaceholder("First Name").fill(employee.firstName);
        await page.getByPlaceholder("Last Name").fill(employee.lastName);
        await page.getByRole("button", { name: "Save" }).click();

        // Search for the employee and Take a screenshot
        await page.getByRole("link", { name: "Employee List" }).click();
        await page
            .getByPlaceholder("Type for hints...")
            .first()
            .fill(employee.firstName);
        await page.getByRole("button", { name: "Search" }).click();
        await page.screenshot({ path: "test-results/SearchEmployee.png" });
    });
});
