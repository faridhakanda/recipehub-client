import { redirect } from 'next/navigation'

//import { stripe } from '../../lib/stripe'
import { stripe } from '@/lib/stripe'
import Link from 'next/link'
import { createSubscriptionPlan } from '@/lib/actions/allPost'
export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')
  
  const {
    status,
    customer_details: { email: customerEmail, userId: customerId },
    metadata, 
    payment_intent,
    amount_total,
    
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })
  
  if (status === 'open') {
    return redirect('/')
  }
  
  if (status === 'complete') {
    //const transactionId: payment_intent?.id || null;
    const transactionId = payment_intent?.id || null;
    const amount = amount_total / 100;
    //const paymentDate = new Date()
    const paymentStatus = status;
    //const userId = metadata.userId;
    console.log(metadata, 'meta data');

    const subsInfo = {
        userId: customerId,
        email: customerEmail,
        planId: metadata.plan,
        amount: amount,
        paymentStatus: paymentStatus,
        transactionId: transactionId
        
    }
    const result = await createSubscriptionPlan(subsInfo);
    console.log(result, 'result');
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to{' '}
          {customerEmail}. If you have any questions, please email{' '}
          <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
        <div>
            <Link href={'/'}>Go to Home</Link>
        </div>
      </section>
    )
  }
}