"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const buttonVariants = cva(
  "inline-flex select-none items-center justify-center rounded-[5px] whitespace-nowrap font-semibold transition-colors aria-disabled:pointer-events-none aria-disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-midnight-purple text-white hover:[@media(pointer:fine)]:bg-midnight-purple-hover active:bg-midnight-purple-active",
        outline:
          "text-purple-gray border border-purple-gray bg-light-purple hover:[@media(pointer:fine)]:bg-light-purple-hover active:bg-light-purple-active",
      },
      size: {
        default: "h-12 px-6 py-4 text-base w-full h-[52px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function disabledFromProps(props: {
  disabled?: boolean;
  "aria-disabled"?: boolean | "false" | "true";
}) {
  return props.disabled || props["aria-disabled"] === true || props["aria-disabled"] === "true";
}

function useDisableEvent(onEvent?: React.EventHandler<React.SyntheticEvent>, disabled?: boolean) {
  return (event: React.SyntheticEvent) => {
    onEvent?.(event);

    if (event.defaultPrevented) {
      return;
    }

    if (disabled) {
      event.stopPropagation();
      event.preventDefault();
    }
  };
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    allowAccessiblyDisabled?: boolean;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, asChild = false, allowAccessiblyDisabled, variant, size, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    const disabled = disabledFromProps(props);
    const fullyDisabled = allowAccessiblyDisabled && disabled;
    const onKeyUpCapture = useDisableEvent(props.onKeyUp, disabled);
    const onClickCapture = useDisableEvent(props.onClickCapture, disabled);
    const onMouseDownCapture = useDisableEvent(props.onMouseDownCapture, disabled);

    return (
      <Comp
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        {...props}
        onClickCapture={onClickCapture}
        onMouseDownCapture={onMouseDownCapture}
        onKeyUp={onKeyUpCapture}
        aria-disabled={disabled}
        disabled={fullyDisabled}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants, type ButtonProps };
