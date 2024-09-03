// pages/api/create-checkout-session.js

import { NextRequest, NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(req: NextRequest) {
  console.log("My Apis is working");
  //   if (req.method === "POST") {
  const reqBody = await req.json();
  // Construct success and cancel URLs using the host or referer header

  console.log("My Apis body", reqBody);

  const { items }: any = reqBody;

  try {
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: "aed",
        product_data: {
          name: item.name,
          description: item.description,
        },
        unit_amount: item.amount,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `http://localhost:4000/payment`,
      cancel_url: `http://localhost:3000/payment`,
    });

    return NextResponse.json({ id: session.id });
  } catch (err: any) {
    return NextResponse.json({ error: `Rao ==>${err.message}` });
  }
  //   } else {
  //     res.setHeader("Allow", "POST");
  //     res.status(405).end("Method Not Allowed");
  //   }
}
