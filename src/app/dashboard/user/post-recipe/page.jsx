import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';
import Link from 'next/link';
import { ShieldExclamation, CircleInfo, Rocket } from '@gravity-ui/icons';
import RecipePost from './RecipeAdd';
import { getPlansForRecipe, getUserAllRecipeByUserId } from '@/lib/actions/allGet';

const Page = async ({ params }) => {
    const { id } = await params;
    const user = await getUserSession();
    console.log('Current User Session:', user);
    
    if (!user) {
        // redirect(`/signin?redirect=/job/${id}/apply`);
        redirect(`/signin?redirect=/dashboard/user/post-recipe`);
    }
    
    // Auth Role Guard Screen
    if (user.role !== 'user') {
        return (
            <div className="w-full min-h-[80vh] flex flex-col justify-center items-center p-4 sm:p-6">
                <div className="max-w-md w-full text-center p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-lg dark:shadow-xl">
                    <div className="w-12 h-12 bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ShieldExclamation className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-zinc-100 mb-2">Access Restricted</h3>
                    <p className="text-gray-600 dark:text-zinc-400 text-sm leading-relaxed mb-6">
                        Only job seekers can apply for positions. Please sign in with a seeker account to proceed.
                    </p>
                    <Link 
                        href={`/signin?redirect=/dashboard/user/post-recipe`} 
                        className="inline-block w-full px-4 py-2.5 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-700 dark:text-zinc-200 rounded-lg text-sm font-medium transition"
                    >
                        Switch Account
                    </Link>
                </div>
            </div>
        );
    }

    const applicant = await getUserAllRecipeByUserId(user?.id);
    const plan = await getPlansForRecipe(user?.plan);
    console.log("plan", plan);
    const applicationCount = applicant.length;
    const hasReachedLimit = applicationCount >= plan.maxRecipePerUser;
    const usagePercentage = Math.min((applicationCount / plan.maxRecipePerUser) * 100, 100);
    
    return (
        <div className="w-full min-h-screen bg-gray-50 dark:bg-zinc-950 py-6 sm:py-8 px-3 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-5 sm:space-y-8">
                {/* 1. Usage & Quota Tracker Card */}
                <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-sm dark:shadow-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4">
                        <div>
                            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-zinc-400">
                                Monthly Quota Status
                            </span>
                            <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-zinc-100 mt-0.5">
                                You have applied to <span className="text-blue-600 dark:text-blue-400">{applicationCount}</span> out of <span className="text-gray-600 dark:text-zinc-400">{plan.maxRecipePerUser === 1000 ? 'Unlimited(1000)' : plan.maxRecipePerUser}</span> positions
                            </h2>
                        </div>
                        <span className="self-start sm:self-center px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 border border-gray-200 dark:border-zinc-700">
                            Current Plan: <strong className="text-gray-900 dark:text-white font-semibold">{plan.name}</strong>
                        </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 dark:bg-zinc-800 h-2.5 rounded-full overflow-hidden mb-4 sm:mb-5">
                        <div 
                            className={`h-full transition-all duration-500 rounded-full ${
                                hasReachedLimit ? 'bg-red-500' : usagePercentage > 66 ? 'bg-amber-500' : 'bg-blue-600 dark:bg-blue-500'
                            }`}
                            style={{ width: `${usagePercentage}%` }}
                        />
                    </div>

                    {/* Upsell Alert Block */}
                    {plan?.name === 'Premium' ? (
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-xl p-4 text-sm text-blue-700 dark:text-blue-300/90">
                            <div className="flex items-start gap-3">
                                <Rocket className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                                <p className="flex-1">Need to apply for more positions? Upgrade your account to unlock unlimited job submissions.</p>
                            </div>
                            <h2 className="whitespace-nowrap text-xs font-bold bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg transition text-center">
                                Already you buy the premium plan!
                            </h2>
                        </div>
                    ) : (
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-xl p-4 text-sm text-blue-700 dark:text-blue-300/90">
                            <div className="flex items-start gap-3">
                                <Rocket className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                                <p className="flex-1">Need to apply for more positions? Upgrade your account to unlock unlimited job submissions.</p>
                            </div>
                            <Link 
                                href="/plans" 
                                className="whitespace-nowrap text-xs font-bold bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg transition text-center"
                            >
                                View Plans
                            </Link>
                        </div>
                    )}
                </div>

                {/* 2. Form Rendering and Dynamic Limit Enforcement Block */}
                {hasReachedLimit ? (
                    /* Lockout State View */
                    <div className="bg-white dark:bg-zinc-900/50 border border-dashed border-gray-300 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 text-center flex flex-col items-center justify-center">
                        <div className="w-10 h-10 bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-zinc-400 rounded-full flex items-center justify-center mb-3">
                            <CircleInfo className="w-5 h-5" />
                        </div>
                        <h4 className="text-base font-semibold text-gray-900 dark:text-zinc-200">Application Limit Reached</h4>
                        <p className="text-sm text-gray-500 dark:text-zinc-500 max-w-sm mt-1">
                            You have exhausted your free credits for this calendar cycle. Upgrade your tier to resume submitting applications immediately.
                        </p>
                    </div>
                ) : (
                    /* Active Form View */
                    <div className="animate-in fade-in-50 duration-300">
                        <RecipePost user={user} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;


// import { getUserSession } from '@/lib/core/session';
// import { redirect } from 'next/navigation';
// import React from 'react';
// import Link from 'next/link';
// import { ShieldExclamation, CircleInfo, Rocket } from '@gravity-ui/icons';
// import RecipePost from './RecipeAdd';
// import { getPlansForRecipe, getUserAllRecipeByUserId } from '@/lib/actions/allGet';

// const Page = async ({ params }) => {
//     const { id } = await params;
//     const user = await getUserSession();
//     console.log('Current User Session:', user);
    
//     if (!user) {
//         redirect(`/login?redirect=/job/${id}/apply`);
//     }
    
//     // Auth Role Guard Screen
//     if (user.role !== 'user') {
//         return (
//             <div className="w-full min-h-[80vh] flex flex-col justify-center items-center p-6">
//                 <div className="max-w-md w-full text-center p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-lg dark:shadow-xl">
//                     <div className="w-12 h-12 bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
//                         <ShieldExclamation className="w-6 h-6" />
//                     </div>
//                     <h3 className="text-xl font-bold text-gray-900 dark:text-zinc-100 mb-2">Access Restricted</h3>
//                     <p className="text-gray-600 dark:text-zinc-400 text-sm leading-relaxed mb-6">
//                         Only job seekers can apply for positions. Please sign in with a seeker account to proceed.
//                     </p>
//                     <Link 
//                         href="/auth/signin" 
//                         className="inline-block w-full px-4 py-2.5 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-700 dark:text-zinc-200 rounded-lg text-sm font-medium transition"
//                     >
//                         Switch Account
//                     </Link>
//                 </div>
//             </div>
//         );
//     }

//     const applicant = await getUserAllRecipeByUserId(user?.id);
//     const plan = await getPlansForRecipe(user?.plan);
//     console.log("plan", plan);
//     const applicationCount = applicant.length;
//     const hasReachedLimit = applicationCount >= plan.maxRecipePerUser;
//     const usagePercentage = Math.min((applicationCount / plan.maxRecipePerUser) * 100, 100);
    
//     return (
//         <div className="w-full min-h-screen bg-gray-50 dark:bg-zinc-950 py-8 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
//                 {/* 1. Usage & Quota Tracker Card */}
//                 <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-sm dark:shadow-lg">
//                     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4">
//                         <div>
//                             <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-zinc-400">
//                                 Monthly Quota Status
//                             </span>
//                             <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-zinc-100 mt-0.5">
//                                 You have applied to <span className="text-blue-600 dark:text-blue-400">{applicationCount}</span> out of <span className="text-gray-600 dark:text-zinc-400">{plan.maxRecipePerUser === 1000 ? 'Unlimited(1000)' : plan.maxRecipePerUser}</span> positions
//                             </h2>
//                         </div>
//                         <span className="self-start sm:self-center px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 border border-gray-200 dark:border-zinc-700">
//                             Current Plan: <strong className="text-gray-900 dark:text-white font-semibold">{plan.name}</strong>
//                         </span>
//                     </div>

//                     {/* Progress Bar */}
//                     <div className="w-full bg-gray-200 dark:bg-zinc-800 h-2.5 rounded-full overflow-hidden mb-4 sm:mb-5">
//                         <div 
//                             className={`h-full transition-all duration-500 rounded-full ${
//                                 hasReachedLimit ? 'bg-red-500' : usagePercentage > 66 ? 'bg-amber-500' : 'bg-blue-600 dark:bg-blue-500'
//                             }`}
//                             style={{ width: `${usagePercentage}%` }}
//                         />
//                     </div>

//                     {/* Upsell Alert Block */}
//                     {plan?.name === 'Premium' ? (
//                         <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-xl p-4 text-sm text-blue-700 dark:text-blue-300/90">
//                             <div className="flex items-start gap-3">
//                                 <Rocket className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
//                                 <p className="flex-1">Need to apply for more positions? Upgrade your account to unlock unlimited job submissions.</p>
//                             </div>
//                             <h2 className="whitespace-nowrap text-xs font-bold bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg transition text-center">
//                                 Already you buy the premium plan!
//                             </h2>
//                         </div>
//                     ) : (
//                         <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-xl p-4 text-sm text-blue-700 dark:text-blue-300/90">
//                             <div className="flex items-start gap-3">
//                                 <Rocket className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
//                                 <p className="flex-1">Need to apply for more positions? Upgrade your account to unlock unlimited job submissions.</p>
//                             </div>
//                             <Link 
//                                 href="/plans" 
//                                 className="whitespace-nowrap text-xs font-bold bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg transition text-center"
//                             >
//                                 View Plans
//                             </Link>
//                         </div>
//                     )}
//                 </div>

//                 {/* 2. Form Rendering and Dynamic Limit Enforcement Block */}
//                 {hasReachedLimit ? (
//                     /* Lockout State View */
//                     <div className="bg-white dark:bg-zinc-900/50 border border-dashed border-gray-300 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 text-center flex flex-col items-center justify-center">
//                         <div className="w-10 h-10 bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-zinc-400 rounded-full flex items-center justify-center mb-3">
//                             <CircleInfo className="w-5 h-5" />
//                         </div>
//                         <h4 className="text-base font-semibold text-gray-900 dark:text-zinc-200">Application Limit Reached</h4>
//                         <p className="text-sm text-gray-500 dark:text-zinc-500 max-w-sm mt-1">
//                             You have exhausted your free credits for this calendar cycle. Upgrade your tier to resume submitting applications immediately.
//                         </p>
//                     </div>
//                 ) : (
//                     /* Active Form View */
//                     <div className="animate-in fade-in-50 duration-300 bg-white dark:bg-transparent rounded-2xl p-4 sm:p-6 shadow-sm dark:shadow-none">
//                         <RecipePost user={user}/>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Page;







// import React from 'react';
// //import PostRecipeForm from './postRecipe';
// import { getUserSession } from '@/lib/core/session';
// //import AddRecipe from './addRecipe';
// import { getPlans, getPlansForRecipe, getUserAllRecipeByUserId } from '@/lib/actions/allGet';
// import RecipePost from './RecipeAdd';


// const Page = async() => {
//     const user = await getUserSession();
//     console.log('user in add recipe page: ', user);
//     const userPlan = await getPlansForRecipe(user?.plan);
//     console.log('user current plan is: ', userPlan);
//     const userAllRecipePost = await getUserAllRecipeByUserId(user?.id);
//     return (
//         <div>
//             <h2>Add Recipe</h2>
//             <h2>Total Recipe added this User: {userAllRecipePost.length}</h2>
//             <h2>User current plan is: {userPlan?.name}</h2>
//             <h2>User current recipe add amount: {userPlan?.maxRecipePerUser}</h2>
//             <h2>Username: {user?.name}</h2>
//             <h2>Userplan: {user?.plan}</h2>
//             <h2>isUnlimited: {userPlan?.isUnlimited === 'true' ? "Unlimited" : "2"}</h2>
//             {/* <AddRecipe user={user} /> */}
//             {/* <PostRecipeForm user={user}/> */}
//             {/* <AddRecipe user={user}/> */}
//             <RecipePost user={user}/>
//         </div>
//     );
// };

// export default Page;



// import { getUserSession } from '@/lib/core/session';
// import { redirect } from 'next/navigation';
// import React from 'react';
// //import JobApply from './JobApply';
// //import { getApplicationsByApplicant } from '@/lib/api/applications';
// import Link from 'next/link';
// // Importing a few Gravity UI icons to make it look clean and consistent
// import { ShieldExclamation, CircleInfo, Rocket } from '@gravity-ui/icons';
// // import { getPlanById } from '@/lib/api/plans';
// // import { applicantJobAppliedDetail } from '@/lib/actions/applications';
// //import JobApplicationForm from './jobApply';
// import RecipePost from './RecipeAdd';
// import { getPlansForRecipe, getUserAllRecipeByUserId } from '@/lib/actions/allGet';
// //import { getPlans } from '@/lib/actions/allGet';

// const Page = async ({ params }) => {
//     const { id } = await params;
//     const user = await getUserSession();
//     //const user = await getUserSession();
//     console.log('Current User Session:', user);
//     if (!user) {
//         redirect(`/login?redirect=/job/${id}/apply`);
//     }
    
//     // Auth Role Guard Screen
//     if (user.role !== 'user') {
//         return (
//             <div className="w-full min-h-[80vh] flex flex-col justify-center items-center text-white p-6">
//                 <div className="max-w-md w-full text-center p-8 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl">
//                     <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
//                         <ShieldExclamation className="w-6 h-6" />
//                     </div>
//                     <h3 className="text-xl font-bold text-zinc-100 mb-2">Access Restricted</h3>
//                     <p className="text-zinc-400 text-sm leading-relaxed mb-6">
//                         Only job seekers can apply for positions. Please sign in with a seeker account to proceed.
//                     </p>
//                     <Link 
//                         href="/auth/signin" 
//                         className="inline-block w-full px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-sm font-medium transition"
//                     >
//                         Switch Account
//                     </Link>
//                 </div>
//             </div>
//         );
//     }

//     // const applications = await getApplicationsByApplicant(user.id);
//     // const applications = await applicantJobAppliedDetail(user.id);
//     // const plan = await getPlanById(user?.plan || 'seeker_free')
    
//     // const job = await getJobById(id);
//     // const plan = await getPlans(user?.plan);
//     // const applicationCount = applications?.length || 0;
//     // const userRecipe = await getUserAllRecipeByUserId(user?._id);
//     // console.log(userRecipe, 'user recipe');
//     const applicant = await getUserAllRecipeByUserId(user?.id);
//     const plan = await getPlansForRecipe(user?.plan);
//     console.log("plan", plan);
//     const applicationCount = applicant.length;
//     const hasReachedLimit = applicationCount >= plan.maxRecipePerUser;
    
//     // Calculate application usage percentage for a beautiful dynamic progress bar
//     const usagePercentage = Math.min((applicationCount / plan.maxRecipePerUser) * 100, 100);
    
//     return (
//         <div className="w-full  min-h-screen bg-gray-200 dark:bg-zinc-950 text-zinc-700 dark:text-zinc-50 py-12 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-3xl mx-auto space-y-8">
//                 {/* 1. Usage & Quota Tracker Card */}
//                 <div className="bg-gray-200 text-zinc-200 dark:bg-zinc-900 dark:text-gray-200 border border-zinc-200 rounded-2xl p-6 shadow-lg">
//                     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
//                         <div>
//                             <span className="text-xs font-semibold uppercase tracking-wider text-zinc-800">
//                                 Monthly Quota Status
//                             </span>
                            
//                             <h2 className="text-lg font-bold text-zinc-800 mt-0.5">
//                                 You have applied to <span className="text-blue-400">{applicationCount}</span> out of <span className="text-zinc-400">{plan.maxRecipePerUser === 1000 ? 'Unlimited(1000)': 2}</span> positions
//                             </h2>
//                         </div>
//                         <span className="self-start sm:self-center px-2.5 py-1 text-xs font-medium rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
//                             Current Plan: <strong className="text-white font-semibold">{plan.name}</strong>
//                         </span>
//                     </div>

//                     {/* Progress Bar */}
//                     <div className="w-full bg-gray-500 dark:bg-zinc-800 h-2.5 rounded-full overflow-hidden mb-5">
//                         <div 
//                             className={`h-full transition-all duration-500 rounded-full ${
//                                 hasReachedLimit ? 'bg-red-500' : usagePercentage > 66 ? 'bg-amber-500' : 'bg-blue-500'
//                             }`}
//                             style={{ width: `${usagePercentage}%` }}
//                         />
//                     </div>

//                     {/* Upsell Alert Block */}
//                     {plan?.name === 'Premium' ? 
//                         (
//                             <div className="flex items-start gap-3 bg-blue-950/30 border border-blue-900/50 rounded-xl p-4 text-sm text-blue-300/90">
//                                 <Rocket className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
//                                 <div className="flex-1 sm:flex sm:items-center sm:justify-between gap-4">
//                                     <p>Need to apply for more positions? Upgrade your account to unlock unlimited job submissions.</p>
//                                     <h2 
//                                         // href="/plans" 
//                                         className="inline-block mt-2 sm:mt-0 whitespace-nowrap text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg transition"
//                                     >
//                                         Already you buy the premium plan!
//                                     </h2>
//                                 </div>
//                             </div>
//                         ) :
//                         (
//                             <div className="flex items-start gap-3 bg-blue-950/30 border border-blue-900/50 rounded-xl p-4 text-sm text-blue-300/90">
//                                 <Rocket className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
//                                 <div className="flex-1 sm:flex sm:items-center sm:justify-between gap-4">
//                                     <p>Need to apply for more positions? Upgrade your account to unlock unlimited job submissions.</p>
//                                     <Link 
//                                         href="/plans" 
//                                         className="inline-block mt-2 sm:mt-0 whitespace-nowrap text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg transition"
//                                     >
//                                         View Plans
//                                     </Link>
//                                 </div>
//                             </div>
//                         )
//                     }
                   
//                 </div>

//                 {/* 2. Form Rendering and Dynamic Limit Enforcement Block */}
//                 {hasReachedLimit ? (
//                     /* Lockout State View */
//                     <div className="bg-zinc-900/50 border border-dashed border-zinc-800 rounded-2xl p-8 text-center flex flex-col items-center justify-center">
//                         <div className="w-10 h-10 bg-zinc-800 text-zinc-400 rounded-full flex items-center justify-center mb-3">
//                             <CircleInfo className="w-5 h-5" />
//                         </div>
//                         <h4 className="text-base font-semibold text-zinc-200">Application Limit Reached</h4>
//                         <p className="text-sm text-zinc-500 max-w-sm mt-1">
//                             You have exhausted your free credits for this calendar cycle. Upgrade your tier to resume submitting applications immediately.
//                         </p>
//                     </div>
//                 ) : (
//                     /* Active Form View */
//                     <div className="animate-in fade-in-50 duration-300">
//                         {/* <JobApplicationForm applicant={user} job={job} /> */}
//                         <RecipePost user={user}/>
//                     </div>
//                 )}
                
//             </div>
//         </div>
//     );
// };

// export default Page;