import { Button } from "@queenslab/credit-card/components/ui/Button";
import { cn } from "@queenslab/credit-card/utils/cn";
import { animate, motion } from "motion/react";
import { useEffect, useRef } from "react";

const order: {
  summary: {
    subtotal: number;
    fees: number;
    freight: number;
    total: number;
    vat: number;
  };
  products: Array<{
    id: number;
    name: string;
    quantity: number;
    price: number;
    priceIncVat: number;
    vat: number;
  }>;
} = {
  summary: {
    subtotal: 2500,
    fees: 100,
    freight: 50,
    total: 2650,
    vat: 530,
  },
  products: [
    {
      id: 1,
      name: "10% luck",
      quantity: 1,
      price: 100,
      priceIncVat: 125,
      vat: 25,
    },
    {
      id: 2,
      name: "20% skill",
      quantity: 1,
      price: 200,
      priceIncVat: 250,
      vat: 50,
    },
    {
      id: 3,
      name: "15% concentrated power of will",
      quantity: 1,
      price: 150,
      priceIncVat: 187.5,
      vat: 37.5,
    },
    {
      id: 4,
      name: "5% pleasure",
      quantity: 1,
      price: 50,
      priceIncVat: 62.5,
      vat: 12.5,
    },
    {
      id: 5,
      name: "50% pain",
      quantity: 1,
      price: 500,
      priceIncVat: 625,
      vat: 125,
    },
    {
      id: 6,
      name: "100% reason to remember the name",
      quantity: 1,
      price: 1000,
      priceIncVat: 1250,
      vat: 250,
    },
  ],
};

export const Summary = ({ goToCheckout }: { goToCheckout: () => void }) => {
  const subtotalRef = useRef<HTMLSpanElement>(null);
  const feesRef = useRef<HTMLSpanElement>(null);
  const freightRef = useRef<HTMLSpanElement>(null);
  const totalRef = useRef<HTMLSpanElement>(null);
  const vatRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!subtotalRef.current) return;

    const subtotalControl = animate(0, order.summary.subtotal, {
      duration: 0.5,
      delay: order.products.length / 2 + 0.5,
      onUpdate: (latest) => {
        // @ts-expect-error - TypeScript doesn't understand subtotalRef.current isn't null at this point
        subtotalRef.current.innerText = Math.floor(latest);
      },
    });

    const feesControl = animate(0, order.summary.fees, {
      duration: 0.5,
      delay: order.products.length / 2 + 1,
      onUpdate: (latest) => {
        // @ts-expect-error - TypeScript doesn't understand feesRef.current isn't null at this point
        feesRef.current.innerText = Math.floor(latest);
      },
    });

    const freightControl = animate(0, order.summary.freight, {
      duration: 0.5,
      delay: order.products.length / 2 + 1.5,
      onUpdate: (latest) => {
        // @ts-expect-error - TypeScript doesn't understand freightRef.current isn't null at this point
        freightRef.current.innerText = Math.floor(latest);
      },
    });

    const totalControl = animate(0, order.summary.total, {
      duration: 0.5,
      delay: order.products.length / 2 + 2,
      onUpdate: (latest) => {
        // @ts-expect-error - TypeScript doesn't understand subtotalRef.current isn't null at this point
        totalRef.current.innerText = Math.floor(latest);
      },
    });

    const vatControl = animate(0, order.summary.vat, {
      duration: 0.5,
      delay: order.products.length / 2 + 2.5,
      onUpdate: (latest) => {
        // @ts-expect-error - TypeScript doesn't understand vatRef.current isn't null at this point
        vatRef.current.innerText = Math.floor(latest);
      },
    });

    return () => {
      subtotalControl.stop();
      feesControl.stop();
      freightControl.stop();
      totalControl.stop();
      vatControl.stop();
    };
  }, []);

  return (
    <div className="grid grid-cols-1 gap-8 text-center">
      <div className="grid grid-cols-1 gap-2">
        <motion.h1
          className="text-2xl font-semibold text-queenslab-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          Your cart
        </motion.h1>
        <motion.p
          className="text-muted-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
        >
          Containing {order.products.length} items
        </motion.p>
      </div>

      <div className="rounded-lg border border-transparent overflow-hidden shadow-xl">
        <ul className="divide-y divide-border">
          {order.products.map((row, i) => {
            return (
              <motion.li
                key={`row-${row.id}`}
                className={cn(
                  "p-3",
                  i % 2 === 0 ? "bg-accent" : "bg-accent/80"
                )}
                initial={{
                  opacity: 0,
                  x: i % 2 === 0 ? -100 : 100,
                  filter: "blur(4px)",
                }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.5, delay: (i + 1) / 2 }}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-muted-content">x{row.quantity}</span>
                  <span className="flex-1 text-start">{row.name}</span>
                  <span>{row.priceIncVat} QL</span>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>

      <motion.div
        className="grid grid-cols-1 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: order.products.length / 2 + 0.5 }}
      >
        <h3 className="text-xl font-semibold text-queenslab-primary">
          Summary
        </h3>

        <div className="grid grid-cols-1 shadow-xl overflow-hidden rounded-lg">
          <div className="flex items-center gap-2 justify-center bg-accent p-3 border-b border-border">
            <span>Cart subtotal</span>
            <span ref={subtotalRef} className="flex-1 text-end">
              {order.summary.subtotal}
            </span>
            <span>QL</span>
          </div>

          <div className="flex items-center gap-2 justify-center bg-accent/80 text-muted-content p-3 border-b border-border">
            <span>Fees</span>
            <span ref={feesRef} className="flex-1 text-end">
              {order.summary.fees}
            </span>
            <span>QL</span>
          </div>

          <div className="flex items-center gap-2 justify-center bg-accent text-muted-content p-3 border-b border-border">
            <span>Freight</span>
            <span ref={freightRef} className="flex-1 text-end">
              {order.summary.freight}
            </span>
            <span>QL</span>
          </div>

          <div className="flex items-center gap-2 justify-center bg-accent/80 p-3 border-b border-border">
            <span>Total</span>
            <span ref={totalRef} className="flex-1 text-end">
              {order.summary.total}
            </span>
            <span>QL</span>
          </div>

          <div className="flex items-center gap-2 justify-center bg-accent text-muted-content p-3">
            <span>Whereof VAT</span>
            <span ref={vatRef} className="flex-1 text-end">
              {order.summary.vat}
            </span>
            <span>QL</span>
          </div>
        </div>
      </motion.div>

      <Button asChild>
        <motion.button
          onClick={goToCheckout}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: order.products.length / 2 + 1 }}
        >
          <span className="text-xl ">Continue to checkout</span>
        </motion.button>
      </Button>
    </div>
  );
};
