import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


export const PLAN_PRICE_ID = {
    //'user_premium': 'prod_UjYuTjfaPWJ2ZD' and this is subscription
    'premium': 'price_1Tk5mHPLuBM45V2ilGL2YCDT',
    
    
    // this plan create after this pay
    //'premium': 'price_1TnMlHPLuBM45V2iIwdVStOA',
    // for user recipe purchase
    'recipe': 'price_1TnHTCPLuBM45V2iWBIXpOT3'
    
}