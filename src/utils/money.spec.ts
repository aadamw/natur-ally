import { describe, expect, it } from "vitest";

import { formatAmount, getDonationAmount } from "./money";

describe("formatAmount", () => {
  it("should return 0.00 when value is NaN", () => {
    expect(formatAmount(NaN)).toBe("0.00");
  });

  it("should return formatted value: 1000 => 1,000", () => {
    expect(formatAmount(1000)).toBe("1,000");
  });

  it("should return formatted value: 2000.50 => 2,000.5", () => {
    expect(formatAmount(2000.5)).toBe("2,000.5");
  });
});

describe("getDonationAmount", () => {
  it("should return 0 when amount is 0 and 1 month", () => {
    expect(getDonationAmount(0, 1)).toBe(0);
  });

  it("should return 0 when months is 0", () => {
    expect(getDonationAmount(100, 0)).toBe(0);
  });

  it("should return 100 when amount is 100 and months is 1", () => {
    expect(getDonationAmount(100, 1)).toBe(100);
  });

  it("should return 200 when amount is 100 and months is 2", () => {
    expect(getDonationAmount(100, 2)).toBe(200);
  });
});
