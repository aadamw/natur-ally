import { expect, it, vi } from "vitest";

import { render, screen, userEvent } from "@/utils/test";
import { Button, ButtonProps } from "./button";

const setup = (props?: ButtonProps) => render(<Button {...props}>Test</Button>);

const getButton = () => screen.getByRole("button", { name: "Test" });

it("should render the button", () => {
  setup();
  expect(getButton()).toBeInTheDocument();
});

it("should have aria-disabled=true when disabled prop is passed", () => {
  setup({ disabled: true });
  expect(getButton()).toHaveAttribute("aria-disabled", "true");
  expect(getButton()).not.toBeDisabled();
});

it("should call onClick when clicked", async () => {
  const onClick = vi.fn();
  setup({ onClick });

  await userEvent.click(getButton());

  expect(onClick).toHaveBeenCalledTimes(1);
});

it("should prevent onClick when disabled", async () => {
  const onClick = vi.fn();
  setup({ onClick, disabled: true });

  await userEvent.click(getButton());

  expect(onClick).not.toHaveBeenCalled();
});

it("should allow focus when disabled", async () => {
  setup({ disabled: true });

  expect(getButton()).not.toHaveFocus();

  await userEvent.tab();

  expect(getButton()).toHaveFocus();
});

it("should prevent focus when allowAccessiblyDisabled is passed in props", async () => {
  setup({ disabled: true, allowAccessiblyDisabled: true });

  expect(getButton()).not.toHaveFocus();

  await userEvent.tab();

  expect(getButton()).not.toHaveFocus();
});
