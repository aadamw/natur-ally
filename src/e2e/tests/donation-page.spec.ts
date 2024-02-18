import { test } from "@playwright/test";
import { addMonths, format } from "date-fns";

import { DonationPage } from "../pages/donation.page";

test.describe("Donation page", () => {
  test("should display the donation form", async ({ page }) => {
    const donationPage = new DonationPage(page);

    await donationPage.visitPage();
    await donationPage.validateIfCardIsVisible();
  });

  test("should fill the form and submit", async ({ page }) => {
    const nextMonthDate = addMonths(new Date(), 1);
    const donationPage = new DonationPage(page);

    await donationPage.visitPage();

    await donationPage.fillDonationAmountField("1000.00");
    await donationPage.validateDonationAmountField("1,000.00");

    await donationPage.increaseMothByOne();

    const monthAfterIncrease = addMonths(nextMonthDate, 1);
    await donationPage.validateMonthValue(format(monthAfterIncrease, "MMMM"));
    await donationPage.validateYearValue(format(monthAfterIncrease, "yyyy"));

    await donationPage.submitForm();
  });

  test("should increase and decrease the month", async ({ page }) => {
    const nextMonthDate = addMonths(new Date(), 1);
    const donationPage = new DonationPage(page);

    await donationPage.visitPage();

    await donationPage.increaseMothByOne();
    const monthAfterIncrease = addMonths(nextMonthDate, 1);
    await donationPage.validateMonthValue(format(monthAfterIncrease, "MMMM"));
    await donationPage.validateYearValue(format(monthAfterIncrease, "yyyy"));

    await donationPage.decreaseMonthByOne();
    await donationPage.validateMonthValue(format(nextMonthDate, "MMMM"));
    await donationPage.validateYearValue(format(nextMonthDate, "yyyy"));
  });

  test("should display total donation amount and timeline", async ({ page }) => {
    const nextMonthDate = addMonths(new Date(), 1);
    const donationPage = new DonationPage(page);

    await donationPage.visitPage();
    await donationPage.fillDonationAmountField("1000");
    await donationPage.increaseMothByOne();
    await donationPage.submitForm();

    const monthAfterIncrease = addMonths(nextMonthDate, 1);
    await donationPage.validateTotalDonationAmount("$2,000");
    await donationPage.validateMonthlyDonationAmount("$1,000");
    await donationPage.validateDonationTimeline(format(monthAfterIncrease, "MMMM yyyy."));
  });
});
