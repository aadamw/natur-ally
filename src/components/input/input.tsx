"use client";

import { addMonths, format, isSameMonth, subMonths } from "date-fns";
import * as React from "react";
import ReactCurrencyInput from "react-currency-input-field";

import { cn } from "@/utils/cn";
import { ChevronRight, DollarIcon } from "../icons";

type CurrencyInputProps = React.ComponentProps<typeof ReactCurrencyInput> & {
  leadingIcon?: React.ReactNode;
};

const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ className, type, leadingIcon, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex h-[60px] gap-2 rounded-[4px] border border-blue-gray-50 p-4 pl-2 focus-within:border-midnight-purple",
          className,
        )}
      >
        <div className="flex h-6 w-6 items-center justify-center">
          <DollarIcon />
        </div>

        <ReactCurrencyInput
          type={type}
          className={cn(
            "h-[28px] w-full font-rubik outline-none",
            "placeholder:text-2xl placeholder:font-medium placeholder:leading-7 placeholder:text-black/20",
            "text-2xl font-medium leading-7 text-midnight-purple",
            "disabled:cursor-not-allowed",
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
CurrencyInput.displayName = "CurrencyInput";

type DateInputProps = Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> & {
  value: Date;
  onChange: (date: Date) => void;
};

const DateInput = React.forwardRef<HTMLDivElement, DateInputProps>(
  ({ className, value, onChange, ...props }, ref) => {
    const nextMonthDate = React.useRef(addMonths(new Date(), 1)).current;
    const isCurrentMonth = isSameMonth(value, nextMonthDate);

    const subMonth = () => {
      if (isCurrentMonth) return;

      onChange(subMonths(value, 1));
    };

    const addMonth = () => {
      onChange(addMonths(value, 1));
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex h-[60px] items-center justify-between gap-2 rounded-[4px] border border-blue-gray-50 p-4 pl-2  focus-within:border-midnight-purple",
          className,
        )}
        {...props}
      >
        <button
          type="button"
          aria-disabled={isCurrentMonth}
          onClick={subMonth}
          aria-label="Previous Month"
          className="rounded-[5px] active:bg-[#E8EAF2] aria-disabled:cursor-not-allowed aria-disabled:hover:bg-transparent hover:[@media(pointer:fine)]:bg-[#F3F5FE]"
        >
          <ChevronRight className="rotate-180" />
        </button>
        <div className="flex flex-col text-center text-purple-gray">
          <span className="text-base font-medium leading-[20px]">{format(value, "MMMM")}</span>
          <span className="text-xs ">{format(value, "yyyy")}</span>
        </div>
        <button
          type="button"
          aria-label="Next Month"
          onClick={addMonth}
          className="rounded-[5px] active:bg-[#E8EAF2] aria-disabled:cursor-not-allowed aria-disabled:hover:bg-transparent hover:[@media(pointer:fine)]:bg-[#F3F5FE]"
        >
          <ChevronRight />
        </button>
      </div>
    );
  },
);
DateInput.displayName = "DateInput";

export { CurrencyInput, type CurrencyInputProps, DateInput, type DateInputProps };
