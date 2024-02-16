import * as React from "react";

import { cn } from "@/utils/cn";
import { CurrencyInput, DateInput, DateInputProps, type CurrencyInputProps } from "../input/input";
import { Label, type LabelProps } from "../label/label";

type CurrencyFieldProps = CurrencyInputProps & {
  label: LabelProps["children"];
};

function CurrencyField({ label, className, ...props }: CurrencyFieldProps) {
  const fallbackId = React.useId();
  const id = props?.id ?? fallbackId;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={id}>{label}</Label>
      <CurrencyInput id={id} {...props} />
    </div>
  );
}

type DateFieldProps = DateInputProps & {
  label: LabelProps["children"];
};

function DateField({ label, className, ...props }: DateFieldProps) {
  const fallbackId = React.useId();
  const id = props?.id ?? fallbackId;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={id}>{label}</Label>
      <DateInput id={id} {...props} />
    </div>
  );
}

export { CurrencyField, type CurrencyFieldProps, DateField, type DateFieldProps };
