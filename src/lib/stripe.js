import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


export const PLAN_PRICE_ID = {
    //'user_premium': 'prod_UjYuTjfaPWJ2ZD'
    'premium': 'price_1Tk5mHPLuBM45V2ilGL2YCDT'
    
}