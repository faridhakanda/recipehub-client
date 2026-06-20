
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

//import { stripe } from '../../../lib/stripe'
import { PLAN_PRICE_ID, stripe } from '@/lib/stripe'
import { getUserSession } from '@/lib/core/session'
export async function POST() {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')
    
    // price from stripe.js
    const priceId = PLAN_PRICE_ID['user_premium'];

    const user = await getUserSession();
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
        customer_email: user?.email,
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          // user pro id is : prod_UjYPTU2E6bRmcx
          // user premium plan id is: prod_UjYuTjfaPWJ2ZD
          // this was default plan price id: price_1Tk50rPLuBM45V2iuHslW6GD
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${origin}/plans/success?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}