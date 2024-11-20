import {
  PaymentContextProvider,
  usePaymentContext,
} from "@queenslab/credit-card/components/Payment/usePaymentContext";
import {
  QueensLabIcon,
  QueensLabLogo,
} from "@queenslab/credit-card/components/QueensLab";
import { Button } from "@queenslab/credit-card/components/ui/Button";
import { Input } from "@queenslab/credit-card/components/ui/Input";
import { Label } from "@queenslab/credit-card/components/ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@queenslab/credit-card/components/ui/Select";
import { cn } from "@queenslab/credit-card/utils/cn";
import { AnimatePresence, motion } from "motion/react";
import {
  ComponentProps,
  FormHTMLAttributes,
  forwardRef,
  useEffect,
  useMemo,
  useState,
} from "react";

const Card = ({ className }: { className?: string }) => {
  const ctx = usePaymentContext();
  const [frontShowing, setFrontShowing] = useState<boolean>(true);

  useEffect(() => {
    setFrontShowing(ctx.focusing !== "cvv");
  }, [ctx.focusing]);

  const placeholderArray = useMemo<Array<string[]>>(() => {
    const arr = Array.from({ length: 16 }).fill("#") as string[];
    const size = 4;

    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );
  }, []);

  return (
    <AnimatePresence>
      <motion.button
        key={frontShowing ? "front" : "back"}
        data-testid="credit-card"
        tabIndex={-1}
        className={cn(
          "text-start rounded-lg shadow-2xl bg-queenslab-background text-queenslab-content w-80 h-48",
          "focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-ring focus-visible:ring-offset-2 focus-visible:outline-none",
          className
        )}
        style={{ perspective: "666px" }}
        initial={{ rotateY: 180 }}
        animate={{ rotateY: 0 }}
        exit={{ rotateY: 180 }}
        transition={{ duration: 0.3 }}
        onClick={() => setFrontShowing(!frontShowing)}
      >
        {frontShowing ? (
          <div className="grid grid-cols-1 gap-2 p-4">
            <div className="flex items-center justify-between">
              <div className="w-8 h-6 rounded-md bg-queenslab" />
              <QueensLabLogo />
            </div>

            <div
              className={cn(
                "flex items-center gap-2 p-2 rounded-md font-semibold text-xl",
                ctx.focusing === "cardNumber" &&
                  "ring-queenslab-content/15 ring-offset-queenslab-content/15 ring-1 ring-offset-1 outline-none"
              )}
            >
              {placeholderArray.map((arr, groupIndex) => {
                return (
                  <div
                    key={`group-${groupIndex}`}
                    className="relative font-mono flex items-center"
                  >
                    {ctx.cardNumber.length > 0 ? (
                      <AnimatePresence>
                        {arr.map((_, charIndex) => {
                          const idx = groupIndex * 4 + charIndex;
                          const char = ctx.cardNumber?.[idx];

                          if (!char) return null;

                          return (
                            <motion.span
                              key={`char-${charIndex}`}
                              initial={{ y: 10, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ y: 10, opacity: 0 }}
                              transition={{ duration: 0.1 }}
                            >
                              {char}
                            </motion.span>
                          );
                        })}
                      </AnimatePresence>
                    ) : (
                      arr.map((placeholder, charIndex) => {
                        return (
                          <motion.span
                            key={`placeholder-${charIndex}`}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 10, opacity: 0 }}
                            transition={{ duration: 0.1, delay: 0.1 }}
                          >
                            {placeholder}
                          </motion.span>
                        );
                      })
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between">
              <div
                className={cn(
                  "grid grid-cols-1 gap-1 p-2 rounded-md",
                  ctx.focusing === "holder" &&
                    "ring-queenslab-content/15 ring-offset-queenslab-content/15 ring-1 ring-offset-1 outline-none"
                )}
              >
                <span className="text-queenslab-primary">Card Holder</span>
                <div className="font-mono max-w-[23ch] uppercase truncate flex items-center">
                  <AnimatePresence>
                    {(ctx.holder || "Name").split("").map((char, i) => {
                      return (
                        <motion.span
                          key={`holder-${i}`}
                          initial={{ translateY: "-10px", opacity: 0 }}
                          animate={{ translateY: "0px", opacity: 1 }}
                          exit={{ translateY: "-10px", opacity: 0 }}
                        >
                          {char === " " ? "\u00A0" : char}
                        </motion.span>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>

              <div
                className={cn(
                  "grid grid-cols-1 gap-1 place-self-end p-2 rounded-md",
                  ctx.focusing === "expiry" &&
                    "ring-queenslab-content/15 ring-offset-queenslab-content/15 ring-1 ring-offset-1 outline-none"
                )}
              >
                <span className="text-queenslab-primary">Expires</span>
                <div className="flex items-center gap-1 font-mono">
                  <AnimatePresence>
                    <motion.span
                      key={ctx.expiry.month || "MM"}
                      initial={{ translateY: "10px", opacity: 0, width: 0 }}
                      animate={{
                        translateY: "0px",
                        opacity: 1,
                        width: "fit-content",
                      }}
                      exit={{ translateY: "-10px", opacity: 0, width: 0 }}
                    >
                      {ctx.expiry.month || "MM"}
                    </motion.span>
                  </AnimatePresence>
                  <span>/</span>
                  <AnimatePresence>
                    <motion.span
                      key={ctx.expiry.year || "YY"}
                      initial={{ translateY: "-10px", opacity: 0, width: 0 }}
                      animate={{
                        translateY: "0px",
                        opacity: 1,
                        width: "fit-content",
                      }}
                      exit={{ translateY: "10px", opacity: 0, width: 0 }}
                    >
                      {ctx.expiry.year || "YY"}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-4 grid grid-cols-1 gap-4">
            <div className="bg-queenslab-content/5 w-full h-10" />

            <div className="grid grid-cols-1 gap-2 px-3">
              <span className="place-self-end font-mono text-queenslab-primary">
                CVV
              </span>
              <div className="bg-queenslab-content text-queenslab-accent grid grid-cols-1 place-items-end">
                <div className="flex items-center self-end font-mono">
                  <AnimatePresence>
                    {(ctx.cvv || "•••").split("").map((char, i) => {
                      return (
                        <motion.span
                          key={`cvv-${i}`}
                          className="px-1 rounded-sm"
                          initial={{ translateY: "-10px", opacity: 0 }}
                          animate={{ translateY: "0px", opacity: 1 }}
                          exit={{ translateY: "-10px", opacity: 0 }}
                        >
                          {char}
                        </motion.span>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className="place-self-end px-3">
              <QueensLabIcon className="scale-150" />
            </div>
          </div>
        )}
      </motion.button>
    </AnimatePresence>
  );
};

type TextInputProps = Omit<ComponentProps<typeof Input>, "name"> & {
  name: "cardNumber" | "holder" | "cvv";
  label: string;
};

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ name, label, className, ...rest }, ref) => {
    const ctx = usePaymentContext();

    return (
      <div
        data-testid={name}
        className={cn("grid grid-cols-1 gap-2", className)}
      >
        <Label htmlFor={name}>{label}</Label>
        <Input
          ref={ref}
          id={name}
          name={name}
          value={ctx[name]}
          onChange={(e) => {
            const newValue = e.target.value;

            switch (name) {
              case "cardNumber":
                if (!isNaN(Number(newValue))) {
                  ctx.setCardNumber(newValue);
                }
                break;
              case "holder":
                ctx.setHolder(newValue);
                break;
              case "cvv":
                if (!isNaN(Number(newValue))) {
                  ctx.setCvv(newValue);
                }
                break;
            }
          }}
          onFocus={() => ctx.setFocusing(name)}
          onBlur={() => ctx.setFocusing(undefined)}
          {...rest}
        />
      </div>
    );
  }
);
TextInput.displayName = "TextInput";

const ExpiryInput = ({
  name,
  label,
  className,
}: {
  name: string;
  label: string;
  className?: string;
}) => {
  const ctx = usePaymentContext();

  return (
    <div
      data-testid="expiry"
      className={cn("grid grid-cols-1 gap-2", className)}
    >
      <Label>{label}</Label>
      <input type="hidden" name={name} value={JSON.stringify(ctx.expiry)} />

      <div className="flex items-center gap-2">
        <Select
          value={ctx.expiry.month}
          onValueChange={(e) => {
            ctx.setExpiry((prev) => ({
              ...prev,
              month: e,
            }));
          }}
        >
          <SelectTrigger
            data-testid="expiry-month"
            className={cn(
              "w-[180px]",
              !ctx.expiry.month && "text-input-placeholder"
            )}
            onFocus={() => ctx.setFocusing("expiry")}
            onBlur={() => ctx.setFocusing(undefined)}
          >
            <SelectValue placeholder="MM" />
          </SelectTrigger>
          <SelectContent
            onFocus={() => ctx.setFocusing("expiry")}
            onBlur={() => ctx.setFocusing(undefined)}
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((_month) => {
              const month = _month.toString().padStart(2, "0");
              return (
                <SelectItem key={`month-${month}`} value={month}>
                  {month}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>

        <Select
          value={ctx.expiry.year}
          onValueChange={(e) => {
            ctx.setExpiry((prev) => ({
              ...prev,
              year: e,
            }));
          }}
        >
          <SelectTrigger
            data-testid="expiry-year"
            className={cn(
              "w-[180px]",
              !ctx.expiry.year && "text-input-placeholder"
            )}
            onFocus={() => ctx.setFocusing("expiry")}
            onBlur={() => ctx.setFocusing(undefined)}
          >
            <SelectValue placeholder="YY" />
          </SelectTrigger>
          <SelectContent
            onFocus={() => ctx.setFocusing("expiry")}
            onBlur={() => ctx.setFocusing(undefined)}
          >
            {Array.from({ length: 99 }, (_, i) => i + 1).map((_year) => {
              const year = _year.toString().padStart(2, "0");
              return (
                <SelectItem key={`year-${year}`} value={year}>
                  {year}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

const Form = ({
  id = "payment-form",
  method,
  action,
  className,
  children,
  ...rest
}: {
  id?: string;
  method: string;
  action: string;
  className?: string;
  children: React.ReactNode;
} & FormHTMLAttributes<HTMLFormElement>) => {
  return (
    <form
      id={id}
      method={method}
      action={action}
      className="contents"
      {...rest}
    >
      <div className={cn("grid grid-cols-1 gap-2", className)}>{children}</div>
    </form>
  );
};

const SubmitButton = ({
  form = "payment-form",
  disabled,
  ...rest
}: { form: string } & Omit<ComponentProps<typeof Button>, "form">) => {
  const ctx = usePaymentContext();
  const disabledByContext =
    ctx.cardNumber.length < 16 ||
    ctx.cvv.length < 3 ||
    !ctx.holder ||
    !ctx.expiry.month ||
    !ctx.expiry.year;

  return (
    <Button
      data-testid="submit-button"
      type="submit"
      form={form}
      disabled={
        typeof disabled === "boolean" && disabled === false
          ? false
          : disabledByContext || disabled
      }
      {...rest}
    />
  );
};

const PaymentRoot = ({ children, ...rest }: { children: React.ReactNode }) => {
  return <PaymentContextProvider {...rest}>{children}</PaymentContextProvider>;
};

export const Payment = Object.assign(PaymentRoot, {
  Card: Card,
  Form: Form,
  Button: SubmitButton,
  TextInput: TextInput,
  ExpiryInput: ExpiryInput,
});
