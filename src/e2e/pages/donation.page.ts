import { expect, type Page } from "@playwright/test";

type FieldLabel = "I can donate";

export class DonationPage {
  constructor(readonly page: Page) {}

  private card() {
    return this.page.getByRole("region", { name: "The giving block" });
  }

  private description() {
    return this.page.getByText("Set up your donation goal!");
  }

  private form() {
    return this.page.getByRole("form", { name: "Donation form" });
  }

  private field(name: FieldLabel) {
    return this.page.getByRole("textbox", { name });
  }

  private dateField() {
    return this.page.getByText("Every month until");
  }

  private dateMonthValue() {
    return this.page.getByTestId("selected-month");
  }

  private dateYearValue() {
    return this.page.getByTestId("selected-year");
  }

  private increaseMonthButton() {
    return this.page.getByRole("button", { name: "Next Month" });
  }

  private decreaseMonthButton() {
    return this.page.getByRole("button", { name: "Previous Month" });
  }

  private totalDonationAmount() {
    return this.page.getByTestId("total-donation-amount");
  }

  private donationTimeline() {
    return this.page.getByTestId("donation-timeline");
  }

  private monthlyDonationAmount() {
    return this.page.getByTestId("monthly-donation-amount");
  }

  private submitButton() {
    return this.page.getByRole("button", { name: "Continue" });
  }

  async visitPage() {
    await this.page.goto("/");
  }

  async fillDonationAmountField(amount: string) {
    await this.field("I can donate").fill(amount);
  }

  async validateDonationAmountField(amount: string) {
    expect(await this.field("I can donate").inputValue()).toBe(amount);
  }

  async submitForm() {
    await this.submitButton().click();
  }

  async increaseMothByOne() {
    await this.increaseMonthButton().click();
  }

  async decreaseMonthByOne() {
    await this.decreaseMonthButton().click();
  }

  async validateMonthValue(month: string) {
    await expect(this.dateMonthValue()).toHaveText(month);
  }

  async validateYearValue(year: string) {
    await expect(this.dateYearValue()).toHaveText(year);
  }

  async validateIfCardIsVisible() {
    await expect(this.card()).toBeVisible();
    await expect(this.description()).toBeVisible();
    await expect(this.form()).toBeVisible();
  }

  async validateTotalDonationAmount(amount: string) {
    await expect(this.totalDonationAmount()).toHaveText(amount);
  }

  async validateMonthlyDonationAmount(amount: string) {
    await expect(this.monthlyDonationAmount()).toHaveText(amount);
  }

  async validateDonationTimeline(date: string) {
    await expect(this.donationTimeline()).toHaveText(date);
  }
}
