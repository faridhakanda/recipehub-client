


import { redirect } from 'next/navigation';
import { stripe } from '@/lib/stripe';
import Link from 'next/link';
import { buyRecipe } from '@/lib/actions/allPost';
//import { createSubscriptionPlan } from '@/lib/actions/allPost';
import { CheckShape } from '@gravity-ui/icons';

export default async function Success({ searchParams }) {
    const { session_id, type, recipeId } = await searchParams;
    
    if (!session_id)
        throw new Error('Please provide a valid session_id (`cs_test_...`)');
    
    const session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: [
            'line_items',
            'payment_intent',
            'subscription',
            'subscription.latest_invoice',
            'subscription.latest_invoice.payment_intent',
            'customer',
        ]
    });
    
    if (session.status === 'open') {
        return redirect('/');
    }
    
    if (session.status === 'complete') {
        const amount = session.amount_total ? session.amount_total / 100 : 0;
        const customerEmail = session.customer_details?.email || '';
        const transactionId = session.payment_intent?.id || session_id;
        const subscriptionId = session.subscription?.id || '';
        const paymentType = type || session.metadata?.paymentType || 'subscription';
        
        // Handle Recipe Purchase
        if (paymentType === 'recipe_purchase') {
            const recipeIdFromMetadata = session.metadata?.recipeId || recipeId;
            const recipeName = session.metadata?.recipeName || 'Recipe';
            
            const purchaseData = {
                userId: session.metadata.userId,
                email: customerEmail,
                // planId: 'premium',
                planId: 'recipe',
                amount: amount,
                paymentStatus: session.status,
                transactionId: transactionId,
                recipeId: recipeIdFromMetadata,
                recipeName: recipeName,
                paymentType: 'recipe_purchase',
            };
            
            // Save the purchase
            const result = await buyRecipe(purchaseData);
            console.log('Recipe purchase saved: ', result);

            return (
                <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-orange-50 via-amber-50/30 to-white dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 px-4">
                    <div className="max-w-md w-full bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 text-center border border-green-100 dark:border-green-900/30">
                        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckShape className="w-12 h-12 text-green-500 dark:text-green-400" />
                        </div>
                        
                        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">
                            Recipe Purchase Successful! 🎉
                        </h1>
                        
                        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                            You have successfully purchased the recipe. A confirmation email will be sent to{' '}
                            <span className="font-medium text-zinc-900 dark:text-zinc-200">
                                {customerEmail}
                            </span>.
                        </p>

                        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 mb-6 text-sm text-zinc-600 dark:text-zinc-400">
                            <p>Your recipe purchase has been completed.</p>
                            <p className="mt-1 font-medium text-zinc-800 dark:text-zinc-200">
                                You now have access to: <span className="text-amber-600 dark:text-amber-400">{recipeName}</span>
                            </p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <Link
                                href={`/recipe/${recipeIdFromMetadata}`}
                                className="inline-flex items-center justify-center w-full px-6 py-3 bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40"
                            >
                                View Recipe
                            </Link>
                            <Link
                                href="/dashboard/user/my-recipes"
                                className="inline-flex items-center justify-center w-full px-6 py-3 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-700 dark:text-zinc-300 font-semibold rounded-xl transition-all duration-200"
                            >
                                Go to My Recipes
                            </Link>
                        </div>
                    </div>
                </div>
            );
        }
        
        
        // Fallback - redirect to home
        return redirect('/');
    }
}