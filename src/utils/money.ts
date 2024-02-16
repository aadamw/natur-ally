export function formatAmount(value: number): string {
  if (isNaN(value)) return "0.00";

  const formattedValue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);

  return formattedValue.replace(/[$]+/, "");
}

export function getDonationAmount(amount: number, months: number): number {
  if (!amount) return 0;

  return amount * months;
}
