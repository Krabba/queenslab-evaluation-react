import { createContext, useContext, useState } from "react";

type CardNumber = string;
type Holder = string;
type Expiry = { month: string; year: string };
type Cvv = string;
type Focusing = "cardNumber" | "holder" | "expiry" | "cvv" | undefined;

export type CreditCardProps = {
  cardNumber: CardNumber;
  holder: Holder;
  expiry: Expiry;
  cvv: Cvv;
  focusing: Focusing;
};

type CreditCardContextProps = CreditCardProps & {
  setCardNumber: React.Dispatch<React.SetStateAction<CardNumber>>;
  setHolder: React.Dispatch<React.SetStateAction<Holder>>;
  setExpiry: React.Dispatch<React.SetStateAction<Expiry>>;
  setCvv: React.Dispatch<React.SetStateAction<Cvv>>;
  setFocusing: React.Dispatch<React.SetStateAction<Focusing>>;
};

const PaymentContext = createContext<CreditCardContextProps>({
  cardNumber: "",
  setCardNumber: () => "",
  holder: "",
  setHolder: () => "",
  expiry: { month: "", year: "" },
  setExpiry: () => ({ month: "", year: "" }),
  cvv: "",
  setCvv: () => "",
  focusing: undefined,
  setFocusing: () => undefined,
});

const usePaymentContext = () => {
  const context = useContext(PaymentContext);

  if (context === undefined) {
    throw new Error("usePaymentContext was used outside of its provider.");
  }

  return context;
};

const PaymentContextProvider = ({
  focusing: _focusing,
  cardNumber: _cardNumber = "",
  holder: _holder = "",
  expiry: _expiry = { month: "", year: "" },
  cvv: _cvv = "",
  ...rest
}: Partial<CreditCardProps> & { children: React.ReactNode }) => {
  const [focusing, setFocusing] =
    useState<CreditCardProps["focusing"]>(_focusing);
  const [cardNumber, setCardNumber] =
    useState<CreditCardProps["cardNumber"]>(_cardNumber);
  const [holder, setHolder] = useState<CreditCardProps["holder"]>(_holder);
  const [expiry, setExpiry] = useState<CreditCardProps["expiry"]>(_expiry);
  const [cvv, setCvv] = useState<CreditCardProps["cvv"]>(_cvv);

  return (
    <PaymentContext.Provider
      value={{
        cardNumber,
        setCardNumber,
        holder,
        setHolder,
        expiry,
        setExpiry,
        cvv,
        setCvv,
        focusing,
        setFocusing,
      }}
      {...rest}
    />
  );
};

export { PaymentContextProvider, usePaymentContext };
