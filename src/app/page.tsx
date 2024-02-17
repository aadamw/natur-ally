"use client";

import { addMonths, differenceInMonths, format } from "date-fns";
import * as React from "react";

import { Button } from "@/components/button/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/card/card";
import { CurrencyField, DateField } from "@/components/form/form";
import { GivingIcon, XIcon } from "@/components/icons";
import { formatAmount, getDonationAmount } from "@/utils/money";

export default function Home() {
  const titleId = React.useId();
  const descriptionId = React.useId();
  const currentDate = React.useRef(new Date()).current;
  const [inputValue, setInputValue] = React.useState<string>("");
  const [date, setDate] = React.useState<Date>(addMonths(currentDate, 1));

  const monthsBetweenDates = differenceInMonths(date, currentDate);

  return (
    <main className="flex h-full flex-1 flex-col md:mx-auto md:mt-16 md:flex-none">
      <Card
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="h-full w-full flex-1 flex-grow md:w-[600px] md:rounded-[5px]"
      >
        <button
          type="button"
          aria-label="Close window"
          className="absolute right-6 top-4 z-50 md:hidden"
        >
          <XIcon />
        </button>
        <CardHeader>
          <GivingIcon />
          <div className="flex flex-col justify-center gap-1">
            <CardTitle id={titleId} asChild>
              <h1>The giving block</h1>
            </CardTitle>
            <CardDescription id={descriptionId}>Set up your donation goal!</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4 md:grid-cols-2" aria-label="Donation form">
            <CurrencyField
              label="I can donate"
              placeholder="0.00"
              value={inputValue}
              onValueChange={(value) => {
                if (!value) return setInputValue("");
                setInputValue(value);
              }}
            />
            <DateField
              label="Every month until"
              value={date}
              onChange={(newDate) => setDate(newDate)}
            />
          </form>
          <div className="flex flex-col rounded-[5px] border border-blue-gray-50 md:border-none">
            <div className="grid grid-cols-[minmax(0,1fr),minmax(0,3fr)] items-center justify-between px-4 py-6 md:grid-cols-[minmax(0,1fr),minmax(0,2fr)]">
              <span className="font-medium leading-[19.2px] text-blue-gray-900 md:text-xl md:leading-6">
                Total amount:
              </span>
              <span
                className="truncate text-right text-[32px] font-bold leading-[28.8px] text-purple-gray"
                aria-label="Total donation amount"
                data-testid="total-donation-amount"
              >
                ${formatAmount(getDonationAmount(parseFloat(inputValue), monthsBetweenDates))}
              </span>
            </div>
            <div className="rounded-t-[5px] bg-blue-gray-50 px-4 py-6 text-center text-xs leading-[16.8px] text-blue-gray-900 md:rounded-[5px]">
              You will be sending{" "}
              <strong data-testid="monthly-donation-amount">
                ${formatAmount(parseFloat(inputValue))}
              </strong>{" "}
              every month until{" "}
              <strong data-testid="donation-timeline">{format(date, "MMMM yyyy")}.</strong> Thank
              you!
            </div>
          </div>
          <div className="p-2 md:flex md:gap-[27px]">
            <Button variant="outline" className="hidden md:inline-flex" type="button">
              Cancel
            </Button>
            <Button type="submit">Continue</Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
