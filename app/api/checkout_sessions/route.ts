
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { getSession } from "@/lib/core/server";

export async function POST() {
  try {
    const userSession = await getSession();

    if (!userSession) {
      return NextResponse.redirect(
        new URL("/sign-in", "http://localhost:3000"),
        303
      );
    }

    const headersList = await headers();
    const origin = headersList.get("origin") || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: "price_1UbbL1JKiHlDtBbm6GqH6Tu0",
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: userSession.user.email,
      metadata: {
        userId: userSession.user.id,
      },
      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/payment?canceled=true`,
    });

    if (!session.url) {
      throw new Error("Stripe Checkout URL was not generated");
    }

    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
