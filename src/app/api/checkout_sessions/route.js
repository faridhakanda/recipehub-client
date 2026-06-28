


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

    // for recipe buy
    //const recipePlan = formData.get('plan');
    const recipeId = formData.get('recipeId');
    const recipeName = formData.get('recipeName');
    console.log('recipe buy: ', recipeId, planId, recipeName);
    if (!planId) {
        return NextResponse.json(
            { error: 'Plan ID is required'},
            { status: 400 }
        );
    }
    // price from stripe.js
    // const priceId = PLAN_PRICE_ID['premium'];
    const priceId = PLAN_PRICE_ID[planId];
    //const recipePrice = PLAN_PRICE_ID[recipePlan];
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
    
    // for recipe buy
    // if (planId === 'premium' && recipeId) {
    //     try {
    //         const session = await stripe.checkout.sessions.create({
    //             customer_email: user?.email,
    //             line_items: [
    //                 {
    //                     price: priceId,
    //                     quantity: 1,
    //                 }
    //             ],
    //             mode: 'subscription',
    //             metadata: {
    //                 plan: planId, 
    //                 userId: userId || 'unknown',
    //                 userEmail: user?.email,
    //                 recipeId: recipeId,
    //                 recipeName: recipeName,
    //             },
    //             success_url: `${origin}/recipe/${recipeId}/purchase/success?session_id={CHECKOUT_SESSION_ID}`,
    //             cancel_url: `${origin}/recipe/${recipeId}`
    //         });
    //         return NextResponse.redirect(session.url, 303)
    //     } catch (err){
    //         return NextResponse.json(
    //             { error: err.message },
    //             { status: err.statusCode || 500 }
    //         )
    //     }
        
    // }
    //if (recipeId && planId === 'premium') {
    if (recipeId) {
            try {
                // Create a one-time payment session for recipe
                const session = await stripe.checkout.sessions.create({
                    //recipeId: recipeId,
                    customer_email: user?.email,
                    payment_method_types: ['card'],
                    line_items: [
                        {
                            price_data: {
                                currency: 'usd',
                                product_data: {
                                    name: recipeName || 'Recipe Purchase',
                                    description: `One-time payment to access the recipe: ${recipeName}`,
                                },
                                //unit_amount: 1999, // $19.99 in cents
                                unit_amount: 499,
                            },
                            quantity: 1,
                        },
                    ],
                    mode: 'payment',
                    metadata: {
                        // plan: 'premium',
                        plan: 'recipe',
                        recipeId: recipeId,
                        recipeName: recipeName || 'Recipe',
                        userId: userId || 'unknown',
                        userEmail: user?.email,
                        paymentType: 'recipe_purchase',
                    },
                    success_url: `${origin}/recipe/${recipeId}/purchase/success?session_id={CHECKOUT_SESSION_ID}`,
                    cancel_url: `${origin}/recipe/${recipeId}`,
                });
                
                return NextResponse.json({ url: session.url });
                
            } catch (stripeError) {
                console.error('Stripe error:', stripeError);
                return NextResponse.json(
                    { error: stripeError.message || 'Failed to create checkout session' },
                    { status: 500 }
                );
            }
        }
    
    
    // here is user recipe add plans for premium
    // old code for subscription and it's work perfectly without transaction id
    // const session = await stripe.checkout.sessions.create({
    //     customer_email: user?.email,
    //     //customer_creation: 'always',
        
    //     //customer_id: user?._id,
    //   line_items: [
    //     {
    //       price: priceId,
    //       quantity: 1,
    //     },
    //   ],
    //   mode: 'subscription',
    //   //metadata: {planId},
    //   metadata: {
    //     plan: planId,
    //     //userId: user?._id || user.id,
    //     userId: userId || 'unknown',
    //     userEmail: user?.email,
    //     // new add below
    //     paymentType: 'subscription_purchase'
    //   },
    //   success_url: `${origin}/plans/success?session_id={CHECKOUT_SESSION_ID}`,
    //   // added 
    //   cancel_url: `${origin}/plans`,
    // });


    // now new code 
    const session = await stripe.checkout.sessions.create({
        //recipeId: recipeId,
        customer_email: user?.email,
        payment_method_types: ['card'],
        line_items: [
            {
                // price_data: {
                //     currency: 'usd',
                //     product_data: {
                //         name: 'Subscription Purchase for unlimited recipe add',
                //         description: `One-time payment to access unlimited recipe add`,
                //     },
                //     unit_amount: 1999, // $19.99 in cents
                //     //unit_amount: 499,
                // },
                price: priceId,
                quantity: 1,
            },
        ],
        mode: 'subscription',
        //mode: 'payment',
        metadata: {
            //plan: 'premium',
            //plan: 'recipe',
            plan: planId,
            userId: userId || 'unknown',
            userEmail: user?.email,
            paymentType: 'subscription_purchase',
        },
        success_url: `${origin}/plans/success?session_id={CHECKOUT_SESSION_ID}`,
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




