import { cn } from "@queenslab/credit-card/utils/cn";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { forwardRef, type InputHTMLAttributes } from "react";

const inputVariants = cva(
  cn(
    "flex h-10 w-full rounded-md px-3 py-2 text-sm bg-input text-input-content",
    "placeholder:text-input-placeholder",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "file:border-0 file:bg-transparent file:text-sm file:font-medium",
    "focus-visible:outline-none"
  ),
  {
    variants: {
      variant: {
        default: cn(
          "ring-offset-ring border border-border",
          "focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2"
        ),
        ghost: cn(""),
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, autoComplete, variant, ...props }, ref) => {
    return (
      <input
        type={type}
        autoComplete={autoComplete || "off"}
        className={cn(inputVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
