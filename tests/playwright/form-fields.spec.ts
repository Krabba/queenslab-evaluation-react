import { expect, test } from "@playwright/test";

test.describe("All form fields work", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });

  test("Card Number", async ({ page }) => {
    const cardNumber = await page.getByTestId("cardNumber");
    const label = await cardNumber.locator("label");
    const input = await cardNumber.locator("input");

    await expect(label).toContainText("Card Number");
    await expect(input).toHaveAttribute("placeholder", "#### #### #### ####");
    await expect(input).toHaveAttribute("required");

    await input.fill("123");
    await expect(await input.inputValue()).toBe("123");
    await input.fill("this should not be allowed");
    await expect(await input.inputValue()).toBe("123");
    await input.fill("12345678901234567");
    await expect(await input.inputValue()).toBe("1234567890123456");
  });

  test("Card Holder", async ({ page }) => {
    const holder = await page.getByTestId("holder");
    const label = await holder.locator("label");
    const input = await holder.locator("input");

    await expect(label).toContainText("Card Holder");
    await expect(input).toHaveAttribute("placeholder", "Name");
    await expect(input).toHaveAttribute("required");
  });

  test("Expiration Date", async ({ page }) => {
    const expiry = await page.getByTestId("expiry");
    const label = await expiry.locator("label");
    const hiddenInput = await expiry.locator("input").first();
    const expiryMonth = await expiry.getByTestId("expiry-month");
    const expiryYear = await expiry.getByTestId("expiry-year");

    await expect(label).toContainText("Expiration Date");
    await expect(hiddenInput).toHaveAttribute("type", "hidden");

    await expect(await expiryMonth.locator("span")).toHaveText("MM");
    await expiryMonth.focus();
    await page.keyboard.press("Enter");
    const expiryMonthContent = await expiry.locator("select").first();
    await expiryMonthContent.selectOption({ index: 0 });
    await expect(expiryMonth).toHaveText("01");
    await page.keyboard.press("Escape");

    await expect(await expiryYear.locator("span")).toHaveText("YY");
    await expiryYear.focus();
    await page.keyboard.press("Enter");
    const expiryYearContent = await expiry.locator("select").last();
    await expiryYearContent.selectOption({ index: 0 });
    await expect(expiryYear).toHaveText("01");
  });

  test("CVV", async ({ page }) => {
    const cvv = await page.getByTestId("cvv");
    const label = await cvv.locator("label");
    const input = await cvv.locator("input");

    await expect(label).toContainText("CVV");
    await expect(input).toHaveAttribute("placeholder", "•••");
    await expect(input).toHaveAttribute("required");

    await input.fill("123");
    await expect(await input.inputValue()).toBe("123");
    await input.fill("this should not be allowed");
    await expect(await input.inputValue()).toBe("123");
    await input.fill("12345");
    await expect(await input.inputValue()).toBe("1234");
  });
});
