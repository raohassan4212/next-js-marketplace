"use client";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const Payment = () => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    const items = [
      {
        name: "T-shirt",
        description: "Comfortable cotton t-shirt",
        amount: 2000, // amount in cents
        quantity: 1,
      },
      {
        name: "Hat",
        description: "Stylish hat",
        amount: 1500, // amount in cents
        quantity: 1,
      },
    ];

    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items }),
    });

    const session = await res.json();

    const stripe = await stripePromise;
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error(result.error.message);
      setLoading(false);
    }
  };
  return (
    <div>
      <h1>Checkout Page</h1>
      <button onClick={handleCheckout} disabled={loading}>
        {loading ? "Loading..." : "Checkout"}
      </button>
    </div>
  );
};

export default Payment;
