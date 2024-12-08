"use client";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../../../components/module/payment/checkOutForm";

const stripePromise = loadStripe(
  "pk_test_51OBuOPEkmX02Z923q0hQwjIfcLTHJ9xmKCkiezlL9ywe6BaUzmL8vAywuBJ2eMMCAoO8qIH5YPznwcEp98zZ6cvH00k7i3RExU"
);

const Payment = () => {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckOutForm></CheckOutForm>
      </Elements>
    </div>
  );
};

export default Payment;
