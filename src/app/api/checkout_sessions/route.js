
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

//import { stripe } from '../../../lib/stripe'
import { PLAN_PRICE_ID, stripe } from '@/lib/stripe'
import { getUserSession } from '@/lib/core/session'
export async function POST(request) {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')
    
    // plans form come the plan id
    const formData = await request.formData();
    const planId = formData.get('plan');

    if (!planId) {
        return NextResponse.json(
            { error: 'Plan ID is required'},
            { status: 400 }
        );
    }
    // price from stripe.js
    // const priceId = PLAN_PRICE_ID['premium'];
    const priceId = PLAN_PRICE_ID[planId];
    if (!priceId) {
        return NextResponse.json(
            { error: 'Invalid plan selected' },
            { status: 400 }
        );
    }
    
    const user = await getUserSession();
    if(!user?.email) {
        return NextResponse.json(
            { error: 'User not authenticated' },
            { status: 401 }
        );
    }

    const userId = user?._id || user._id || user.id || user.userId;
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
        customer_email: user?.email,
        //customer_creation: 'always',
        
        //customer_id: user?._id,
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
      //metadata: {planId},
      metadata: {
        plan: planId,
        //userId: user?._id || user.id,
        userId: userId || 'unknown',
        userEmail: user?.email,
      },
      success_url: `${origin}/plans/success?session_id={CHECKOUT_SESSION_ID}`,
      // added 
      cancel_url: `${origin}/plans`,
    });
    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}