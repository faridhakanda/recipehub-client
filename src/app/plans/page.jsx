import React from 'react';

const PlansPageBuySubscription = () => {
    return (
        <div>
            <h2>Pay with Stripe!</h2>
            <div className="mt-8">
                                <form action="/api/checkout_sessions" method="POST">
                                    <input type="hidden" name="plan" value={'premium'} />
                                    <section>
                                        <button type="submit" role="link"
                                            className={`block w-full text-center text-xs font-semibold px-4 py-3 rounded-xl transition duration-200 
                                                ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20'
                                                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700/50'
                                                `}
                                        >
                                            Checkout
                                        </button>
                                    </section>
                                </form>
                            </div>
        </div>
    );
};

export default PlansPageBuySubscription;