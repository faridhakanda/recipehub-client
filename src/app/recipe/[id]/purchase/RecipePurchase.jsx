

'use client';
import React, { useState } from 'react';

const RecipePurchasePayment = ({ recipeDetail, user }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    console.log('Recipe Details come from purchase page: ', recipeDetail);
    console.log('User details come from purchase page: ', user);
    
    const handlePurchase = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const formData = new FormData();
            formData.append('plan', 'premium');
            formData.append('recipeId', recipeDetail?._id);
            formData.append('recipeName', recipeDetail?.recipeName);

            const response = await fetch('/api/checkout_sessions', {
                method: 'POST',
                body: formData,
            });
            console.log('Response status: ',  response.status);
            console.log('Response headers: ', response.headers);
            if (response.redirected) {
                console.log('Redirected to: ', response.url);
                window.location.href = response.url
            }
            if (!response.ok) {
                const text = await response.text();
                console.error('Response error: ', error);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.url) {
                window.location.href = data.url;
            } else {
                setError(data.error || 'Failed to process payment');
                setLoading(false);
            }
        } catch (error) {
            console.error('Purchase error:', error);
            setError('An error occurred. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto my-4">
            <div className="relative bg-white dark:bg-zinc-900 border-2 border-amber-500/30 dark:border-amber-500/20 rounded-3xl p-8 shadow-2xl shadow-amber-500/10 dark:shadow-amber-500/5 hover:shadow-amber-500/20 transition-all duration-300 hover:-translate-y-2">
                <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-zinc-100">
                        {recipeDetail?.recipeName || 'Recipe Purchase'}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">
                        One-time payment to access this recipe
                    </p>
                    <div className="mt-3">
                        <span className="text-3xl font-bold text-amber-500 dark:text-amber-400">$19.99</span>
                        <span className="text-sm text-gray-500 dark:text-zinc-400 ml-1">one-time</span>
                    </div>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-lg">
                        <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
                    </div>
                )}

                <form onSubmit={handlePurchase}>
                    <input type="hidden" name="plan" value="premium" />
                    <input type="hidden" name="recipeId" value={recipeDetail?._id} />
                    <input type="hidden" name="recipeName" value={recipeDetail?.recipeName} />
                    
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full text-center text-sm font-semibold px-4 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </span>
                        ) : (
                            'Purchase Recipe'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RecipePurchasePayment;




