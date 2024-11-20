import test, { expect } from "@playwright/test";

test("Submit button enabled with good context", async ({ page }) => {
  await page.goto("http://localhost:5173");

  const submitButton = await page.getByTestId("submit-button");
  await expect(submitButton).toBeDisabled();

  const cardNumberInput = await page.getByTestId("cardNumber").locator("input");
  await cardNumberInput.click();
  await cardNumberInput.fill("1234567890123456");

  const holderInput = await page.getByTestId("holder").locator("input");
  await holderInput.click();
  await holderInput.fill("QueensLab Gold Card");

  const expiryMonth = page.getByTestId("expiry-month");
  await expiryMonth.click();
  await page.getByLabel("07").click();

  const expiryYear = page.getByTestId("expiry-year");
  await expiryYear.click();
  await page.getByLabel("07").click();

  const cvvInput = await page.getByTestId("cvv").locator("input");
  await cvvInput.click();
  await cvvInput.fill("123");

  await expect(submitButton).toBeEnabled();

  submitButton.click();
  await page.waitForURL("http://localhost:5173/api/payments");
  await expect(page.url()).toBe("http://localhost:5173/api/payments");
});
