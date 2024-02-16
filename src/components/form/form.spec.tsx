import { addMonths, format } from "date-fns";
import { describe, expect, it, vi } from "vitest";

import { render, screen, userEvent } from "@/utils/test";
import { CurrencyField, CurrencyFieldProps, DateField, DateFieldProps } from "./form";

const setupCurrencyField = (props?: Partial<Omit<CurrencyFieldProps, "label">>) =>
  render(<CurrencyField label="Currency" onValueChange={vi.fn} {...props} />);

const setupDateField = (props?: Partial<Omit<DateFieldProps, "label">>) =>
  render(<DateField label="Date" onChange={vi.fn} value={new Date()} {...props} />);

describe("CurrencyField", () => {
  it("should render the currency field", () => {
    setupCurrencyField();

    expect(screen.getByRole("textbox", { name: "Currency" })).toBeInTheDocument();
  });

  it("should fire onValueChange when value is changed", async () => {
    const onValueChange = vi.fn();
    setupCurrencyField({ onValueChange });

    const input = screen.getByRole("textbox", { name: "Currency" });

    await userEvent.type(input, "123");

    expect(onValueChange).toHaveBeenCalledWith("123");
  });

  it("should properly format value", async () => {
    const onValueChange = vi.fn();
    setupCurrencyField({ onValueChange });

    const input = screen.getByRole("textbox", { name: "Currency" });
    await userEvent.type(input, "1234.00");

    expect(input).toHaveValue("1,234.00");
  });
});

describe("DateField", () => {
  it("should render the date field", () => {
    const currentDate = new Date();
    setupDateField();

    expect(screen.getByText("Date")).toBeInTheDocument();
    expect(screen.getByLabelText("Date Input")).toBeInTheDocument();
    expect(screen.getByText(format(currentDate, "MMMM"))).toBeInTheDocument();
    expect(screen.getByText(format(currentDate, "yyyy"))).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next Month" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Previous Month" })).toBeInTheDocument();
  });

  it('should call onChange when "Next Month" button is clicked', async () => {
    const currentDate = new Date();
    const onChange = vi.fn();
    setupDateField({ onChange });

    await userEvent.click(screen.getByRole("button", { name: "Next Month" }));

    expect(onChange).toHaveBeenCalledWith(addMonths(currentDate, 1));
  });

  it("shouldn't call onChange when 'Previous Month' button is clicked when current month + 1 is selected", async () => {
    const onChange = vi.fn();
    setupDateField({ onChange, value: addMonths(new Date(), 1) });

    await userEvent.click(screen.getByRole("button", { name: "Previous Month" }));

    expect(onChange).not.toHaveBeenCalled();
  });

  it("should call onChange when 'Previous Month' button is clicked when current month + 2 is selected", async () => {
    const currentDate = new Date();
    const onChange = vi.fn();
    setupDateField({ onChange, value: addMonths(currentDate, 2) });

    await userEvent.click(screen.getByRole("button", { name: "Previous Month" }));

    expect(onChange).toHaveBeenCalledWith(addMonths(currentDate, 1));
  });
});
