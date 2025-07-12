import { Page } from "@playwright/test";

export async function login(page: Page) {
    // Go to login page
    await page.goto(
        "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );

    // Fill in credentials
    await page.getByRole("textbox", { name: "Username" }).fill("Admin");
    await page.getByRole("textbox", { name: "Password" }).fill("admin123");

    // Click login
    await page.getByRole("button", { name: "Login" }).click();

    // Wait for dashboard
    await page.waitForURL(/dashboard/);
}
