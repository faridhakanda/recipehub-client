import { redirect } from 'next/navigation'

//import { stripe } from '../../lib/stripe'
import { stripe } from '@/lib/stripe'
import Link from 'next/link'
import { createSubscriptionPlan } from '@/lib/actions/allPost'
import { CheckShape } from '@gravity-ui/icons';
export default async function Success({ searchParams }) {
    // here add in new code:  type
  const { session_id, type } = await searchParams;
  
  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')
  
  // old code 
//   const {
//     status,
//     //customer_details: { email: customerEmail, userId: customerId },
//     customer_details, //: { email: customerEmail },
//     metadata, 
//     payment_intent,
//     amount_total,
//     subscription,
//     //session
    
//   } = await stripe.checkout.sessions.retrieve(session_id, {
//     expand: [
//         'line_items', 
//         'payment_intent', 
//         'subscription', 
//         'subscription.latest_invoice',
//         'subscription.latest_invoice.payment_intent',
//         'customer',
//         //'payment',
        

//     ]
//   })
  
  // new update code 
  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: [
        'line_items',
        'payment_intent',
        'subscription',
        'subscription.latest_invoice',
        'subscription.latest_invoice.payment_intent',
        'customer'
    ]
  });

  if (session.status === 'open') {
    return redirect('/');
  }
  if (session.status === 'complete') {
    const amount = session.amount_total ? session.amount_total / 100 : 0;
    const paymentStatus = session.status;
    const customerEmail = session.customer_details?.email || '';
    //const transactionId = session.payment_intent?.id; // || session_id;
    // let transactionId;
    // if (session.subscription) {
    //     transactionId = session.subscription.latest_invoice?.payment_intent?.id || session.subscription.id;
    // } else {
    //     transactionId = session.payment_intent?.id || session_id;
    // }
    //const transactionId = session.payment_intent.id || session.subscription?.latest_invoice?.payment_intent?.id || session_id;
    const subscriptionId = session.subscription?.id || session_id.subscription?.id || session_id;
    const paymentType = type || session.metadata?.paymentType || 'subscription';
    
    // handle plan subscription
    if (paymentType === 'subscription_purchase') {
        const subsInfo = {
            userId: session.metadata.userId,
            email: customerEmail,
            planId: session.metadata.plan,
            amount: amount,
            paymentStatus: paymentStatus,
            //transactionId: transactionId,
            subscriptionId: subscriptionId,
            paymentType: 'subscription_purchase',
            
        }
        const result = await createSubscriptionPlan(subsInfo);
        console.log('Subscription created: ', result);
    
    

  

  
  // old code 
//   if (status === 'open') {
//     return redirect('/')
//   }
  
//   if (status === 'complete') {
//     //const transactionId = sessions.payment_intent?.id;
//     const amount = amount_total ? amount_total / 100 : 0;
//     //const paymentDate = new Date()
//     //const paymentStatus = session.status;
//     const paymentStatus = status;
//     //const userId = metadata.userId;
//     const customerEmail =  customer_details?.email || '';
//     //const customerEmail =  session.customer_details?.email || '';
//     //const customerId = customer_details?.id || '';
//     //const transactionId = session_id?.id;
//     //const transactionId = session_id.payment_intent?.id || session_id;
//     const transactionId = session.payment_intent?.id || session_id;
//     const subscriptionId = subscription?.id;
//     //const subscriptionId = session.subscription?.id;
//     console.log(metadata, 'meta data');
    
//     const subsInfo = {
//         userId: metadata.userId,
//         email: customerEmail,
//         planId: metadata.plan,
//         amount: amount,
//         paymentStatus: paymentStatus,
//         transactionId: transactionId,
//         subscriptionId: subscriptionId
        
//     }
//     const result = await createSubscriptionPlan(subsInfo);
//     console.log('Subscription created: ', result);
    return (
    


    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-orange-50 via-amber-50/30 to-white dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 px-4">
          <div className="max-w-md w-full bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 text-center border border-green-100 dark:border-green-900/30">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckShape className="w-12 h-12 text-green-500 dark:text-green-400" />
            </div>
            
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">
              Payment Successful! 🎉
            </h1>
            
            <p className="text-zinc-600 dark:text-zinc-400 mb-6">
              We appreciate your business! A confirmation email will be sent to{' '}
              <span className="font-medium text-zinc-900 dark:text-zinc-200">
                {customerEmail}
              </span>.
            </p>

            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 mb-6 text-sm text-zinc-600 dark:text-zinc-400">
              <p>Your premium subscription has been activated.</p>
              <p className="mt-1">You now have access to all premium features!</p>
            </div>

            <Link
              href="/"
              className="inline-flex items-center justify-center w-full px-6 py-3 bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40"
            >
              Go to Home
            </Link>
          </div>
        </div>
      
    );
  }
  // here new add below two line of code 
  return redirect('/');
}
}












