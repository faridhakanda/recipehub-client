
import React from 'react';
import PlansPageBuySubscription from './planBuy';
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';


const page = async() => {
    const user = await getUserSession();
    if(!user) {
        redirect(`/signin?redirect=plans`)
    }
    return (
        <div>
            <PlansPageBuySubscription />
        </div>
    );
};

export default page;





// 'use client';
// import React, { useState } from 'react';
// import Link from 'next/link';
// import { ArrowUpFromSquare, BookOpen, Check, ChevronDown, CircleQuestion, Clock, CloudGear, Medal, Persons, Sparkles, Star } from '@gravity-ui/icons';
// // import {
// //     Check,
// //     CircleQuestion,
// //     ChevronDown,
// //     ChefHat,
// //     Utensils,
// //     Star,
// //     Sparkles,
// //     Clock,
// //     Users,
// //     BookOpen,
// //     Award
// // } from '@gravity-ui/icons';

// const PlansPageBuySubscription = () => {
//     const [openFaq, setOpenFaq] = useState(null);

//     const toggleFaq = (index) => {
//         setOpenFaq(openFaq === index ? null : index);
//     };

//     const premiumPlan = {
//         name: 'Premium',
//         id: 'premium',
//         price: '$19.99',
//         period: '/month',
//         description: 'Unlock the full RecipeHub experience with advanced features and exclusive content to elevate your culinary journey.',
//         icon: <CloudGear className="w-6 h-6 text-amber-400" />,
//         features: [
//             'Unlimited recipe access & saving',
//             'Advanced meal planning tools',
//             'Personalized recipe recommendations',
//             'HD video tutorials & step-by-step guides',
//             'Exclusive chef-curated recipes',
//             'Nutritional insights & dietary tracking',
//             'Community features & recipe sharing',
//             'Priority support & early access'
//         ],
//         cta: 'Start Premium Trial',
//         popular: true
//     };

//     const faqs = [
//         {
//             question: 'Can I cancel my subscription at any time?',
//             answer: 'Yes, absolutely. All our premium tiers operate on flexible, non-binding month-to-month subscription structures. You can easily modify, downgrade, or cancel your renewal configurations through your profile billing dashboard settings at any time with no penalties.'
//         },
//         {
//             question: 'How do refunds work if I change my mind?',
//             answer: 'We maintain a 14-day satisfaction policy. If you determine the premium features aren\'t a proper fit for your current search or hiring sequence within your initial two weeks of service, reach out to support for a complete refund.'
//         },
//         {
//             question: 'What payment methods do you accept?',
//             answer: 'We support all major international credit/debit networks including Visa, Mastercard, American Express, and Discover. Enterprise-grade recruiters also have options to establish monthly or annual invoicing arrangements via bank wire transfers.'
//         },
//         {
//             question: 'What happens if I decide to switch plans mid-month?',
//             answer: 'If you upgrade your plan tier mid-cycle, the transition occurs immediately, and your remaining days on the old tier are applied as a pro-rated credit toward your updated invoice. Downgrades take effect starting with your subsequent billing date.'
//         }
//     ];

//     return (
//         <div className="w-full min-h-screen bg-gradient-to-b from-orange-50 via-amber-50/30 to-white dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 py-16 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-6xl mx-auto">

//                 {/* Header Section */}
//                 <div className="text-center max-w-3xl mx-auto mb-12">
//                     <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100/80 dark:bg-amber-900/30 border border-amber-200/50 dark:border-amber-800/30 mb-6">
//                         <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
//                         <span className="text-xs font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-400">
//                             Premium Access
//                         </span>
//                     </div>
//                     <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 dark:text-zinc-100 mt-2 tracking-tight">
//                         Unlock Your{' '}
//                         <span className="bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
//                             Culinary Potential
//                         </span>
//                     </h1>
//                     <p className="text-zinc-600 dark:text-zinc-400 mt-4 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
//                         Get unlimited access to thousands of recipes, expert cooking guidance, and personalized meal planning tools — all in one place.
//                     </p>
//                 </div>

//                 {/* Premium Card - Centered */}
//                 <div className="max-w-md mx-auto mb-24">
//                     <div className="relative bg-white dark:bg-zinc-900 border-2 border-amber-500/30 dark:border-amber-500/20 rounded-3xl p-8 shadow-2xl shadow-amber-500/10 dark:shadow-amber-500/5 hover:shadow-amber-500/20 transition-all duration-300 hover:-translate-y-2">
//                         {/* Popular Badge */}
//                         <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 text-[10px] font-bold text-white bg-gradient-to-r from-amber-500 to-orange-500 rounded-full uppercase tracking-wider shadow-lg shadow-amber-500/30">
//                             Best Value
//                         </span>

//                         {/* Plan Icon */}
//                         <div className="flex justify-center mb-4">
//                             <div className="p-4 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-2xl border border-amber-200/50 dark:border-amber-700/30">
//                                 {premiumPlan.icon}
//                             </div>
//                         </div>

//                         <h3 className="text-2xl font-bold text-center text-zinc-900 dark:text-zinc-100">
//                             {premiumPlan.name}
//                         </h3>
//                         <p className="text-sm text-center text-zinc-500 dark:text-zinc-400 mt-2 mb-6">
//                             {premiumPlan.description}
//                         </p>

//                         {/* Price */}
//                         <div className="text-center mb-8">
//                             <span className="text-5xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
//                                 {premiumPlan.price}
//                             </span>
//                             <span className="text-sm text-zinc-500 dark:text-zinc-400 font-medium ml-1">
//                                 {premiumPlan.period}
//                             </span>
//                         </div>

//                         {/* Features Grid */}
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
//                             {premiumPlan.features.map((feature, idx) => (
//                                 <div key={idx} className="flex items-start gap-2.5">
//                                     <div className="w-5 h-5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-500 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
//                                         <Check className="w-3 h-3" />
//                                     </div>
//                                     <span className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
//                                         {feature}
//                                     </span>
//                                 </div>
//                             ))}
//                         </div>
                        
//                         {/* CTA Button */}
//                         <form action="/api/checkout_sessions" method="POST">
//                             <input type="hidden" name="plan" value={premiumPlan.id} />
//                             <button
//                                 type="submit"
//                                 role="link"
//                                 className="w-full text-center text-sm font-semibold px-6 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-200 transform hover:scale-[1.02]"
//                             >
//                                 {premiumPlan.cta}
//                             </button>
//                         </form>

//                         {/* Trust Badge */}
//                         <div className="mt-6 flex items-center justify-center gap-4 text-xs text-zinc-500 dark:text-zinc-400">
//                             <span className="flex items-center gap-1">
//                                 <Clock className="w-3.5 h-3.5" />
//                                 14-day trial
//                             </span>
//                             <span className="w-px h-3 bg-zinc-300 dark:bg-zinc-700"></span>
//                             <span className="flex items-center gap-1">
//                                 <Persons className="w-3.5 h-3.5" />
//                                 5,000+ cooks
//                             </span>
//                             <span className="w-px h-3 bg-zinc-300 dark:bg-zinc-700"></span>
//                             <span className="flex items-center gap-1">
//                                 <Medal className="w-3.5 h-3.5" />
//                                 Cancel anytime
//                             </span>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Feature Highlights */}
//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-24">
//                     <div className="text-center p-6 bg-white/50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50">
//                         <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
//                             <BookOpen className="w-6 h-6 text-amber-600 dark:text-amber-400" />
//                         </div>
//                         <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">10,000+ Recipes</h4>
//                         <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Curated from global cuisines</p>
//                     </div>
//                     <div className="text-center p-6 bg-white/50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50">
//                         <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
//                             <ArrowUpFromSquare className="w-6 h-6 text-amber-600 dark:text-amber-400" />
//                         </div>
//                         <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Meal Planning</h4>
//                         <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Smart weekly meal schedules</p>
//                     </div>
//                     <div className="text-center p-6 bg-white/50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50">
//                         <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
//                             <Star className="w-6 h-6 text-amber-600 dark:text-amber-400" />
//                         </div>
//                         <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Premium Features</h4>
//                         <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Exclusive content & tools</p>
//                     </div>
//                 </div>

//                 {/* FAQ Section */}
//                 <div className="max-w-3xl mx-auto border-t border-zinc-200/50 dark:border-zinc-800 pt-16">
//                     <div className="text-center mb-10">
//                         <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-900/30 border border-amber-200/50 dark:border-amber-800/30 text-amber-600 dark:text-amber-400 mb-3">
//                             <CircleQuestion className="w-6 h-6" />
//                         </div>
//                         <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
//                             Frequently Asked Questions
//                         </h2>
//                         <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
//                             Everything you need to know about RecipeHub Premium
//                         </p>
//                     </div>

//                     <div className="space-y-3">
//                         {faqs.map((faq, idx) => {
//                             const isOpen = openFaq === idx;
//                             return (
//                                 <div
//                                     key={idx}
//                                     className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 rounded-xl overflow-hidden transition-all duration-200 hover:border-zinc-300 dark:hover:border-zinc-700"
//                                 >
//                                     <button
//                                         onClick={() => toggleFaq(idx)}
//                                         className="w-full flex items-center justify-between text-left p-5 gap-4 text-zinc-700 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white transition"
//                                     >
//                                         <span className="text-sm font-semibold">{faq.question}</span>
//                                         <ChevronDown
//                                             className={`w-5 h-5 text-zinc-400 dark:text-zinc-500 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-amber-500' : ''
//                                                 }`}
//                                         />
//                                     </button>
                                    
//                                     <div
//                                         className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-48 border-t border-zinc-200/50 dark:border-zinc-800' : 'max-h-0'
//                                             }`}
//                                     >
//                                         <div className="p-5 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed bg-zinc-50/50 dark:bg-zinc-900/50">
//                                             {faq.answer}
//                                         </div>
//                                     </div>
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 </div>

//             </div>
//         </div>
//     );
// };

// export default PlansPageBuySubscription;



