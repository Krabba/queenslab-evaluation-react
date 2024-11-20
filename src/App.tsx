import { Payment } from "@queenslab/credit-card/components/Payment/Payment";
import { Summary } from "@queenslab/credit-card/Summary";
import { IParallax, Parallax, ParallaxLayer } from "@react-spring/parallax";
import { useRef } from "react";

export const App = () => {
  const ref = useRef<IParallax>(null);
  const cardNumberRef = useRef<HTMLInputElement>(null);

  return (
    <div className="w-full h-full grid place-content-center">
      <Parallax pages={3} ref={ref}>
        <ParallaxLayer offset={0}>
          <div className="grid h-full place-items-center gap-2 px-2">
            <Summary
              goToCheckout={() => {
                ref.current?.scrollTo(2);
                cardNumberRef.current?.focus();
              }}
            />
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={2}>
          <div className="h-full grid place-items-center gap-2 px-4">
            <Payment>
              <div className="relative grid place-items-center gap-2">
                <Payment.Card className="absolute -top-52 sm:-top-44 left-1/6 xs:left-1/4" />

                <div className="grid grid-cols-1 gap-8 px-4 pt-12 pb-8 rounded-lg bg-background shadow-xl">
                  <Payment.Form
                    id="payment-form"
                    method="POST"
                    action="/api/payments"
                  >
                    <Payment.TextInput
                      ref={cardNumberRef}
                      label="Card Number"
                      name="cardNumber"
                      placeholder="#### #### #### ####"
                      pattern="\d{16}"
                      maxLength={16}
                      required
                    />
                    <Payment.TextInput
                      label="Card Holder"
                      name="holder"
                      placeholder="Name"
                      required
                    />

                    <div className="grid grid-cols-3 gap-8">
                      <Payment.ExpiryInput
                        className="col-span-2"
                        label="Expiration Date"
                        name="expiry"
                      />
                      <Payment.TextInput
                        label="CVV"
                        name="cvv"
                        placeholder="•••"
                        pattern="\d{3,4}"
                        maxLength={4}
                        required
                      />
                    </div>
                  </Payment.Form>

                  <Payment.Button form="payment-form">Submit</Payment.Button>
                </div>
              </div>
            </Payment>
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
};
