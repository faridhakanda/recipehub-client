

'use client';
import { authClient } from '@/lib/auth-client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { userProfileUpdate } from '@/lib/actions/allUpdate';
import { redirect, useRouter } from 'next/navigation';
import { Gem } from '@gravity-ui/icons';

const ProfilePage = () => {
    const session = authClient.useSession();
    console.log(session.data, 'session');
    const user = session.data?.user;
    const router = useRouter();
    
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user?.name || '');
    const [image, setImage] = useState(user?.image || '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    if (!user) {
        redirect('/');
    }
    // Handle update profile
    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!name.trim()) {
            setError('Name is required');
            return;
        }
        
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const updateData = { 
                name: name.trim(),
                image: image.trim() || ''
            };
            
            const response = await userProfileUpdate(user?.id, updateData);
            
            if (response.success) {
                setSuccess('Profile updated successfully!');
                setIsEditing(false);
                await session.refetch();
                router.push('/dashboard/user/profile');
            } else {
                setError(response.message || 'Failed to update profile');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-gray-600 dark:text-zinc-400">Loading profile...</p>

                </div>
            </div>
            
        );
    }

    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Get initials for avatar
    const getInitials = (name) => {
        if (!name) return 'U';
        return name.charAt(0).toUpperCase();
    };

    // Get plan badge color
    const getPlanBadgeColor = (plan) => {
        switch(plan?.toLowerCase()) {
            case 'premium':
                return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
            case 'pro':
                return 'bg-gradient-to-r from-blue-400 to-blue-600 text-white';
            case 'free':
            default:
                return 'bg-gradient-to-r from-gray-400 to-gray-600 text-white';
        }
    };

    // Get plan icon
    const getPlanIcon = (plan) => {
        switch(plan?.toLowerCase()) {
            case 'premium':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                );
            case 'pro':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13 7H7v6h6V7z" />
                        <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2H9a2 2 0 01-2-2v-2H6a1 1 0 110-2h1V9H6a1 1 0 110-2h1V5a2 2 0 012-2h2V2z" clipRule="evenodd" />
                    </svg>
                );
            case 'free':
            default:
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                );
        }
    };

    // Get plan display name
    const getPlanDisplayName = (plan) => {
        switch(plan?.toLowerCase()) {
            case 'premium':
                return 'Premium';
            case 'pro':
                return 'Pro';
            case 'free':
            default:
                return 'Free';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 py-6 sm:py-8 px-3 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Profile Card */}
                <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg dark:shadow-xl dark:shadow-zinc-900/50 border border-gray-200 dark:border-zinc-800 overflow-hidden">
                    
                    {/* Cover Image */}
                    <div className="h-24 sm:h-32 md:h-40 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700"></div>
                    
                    {/* Profile Content */}
                    <div className="px-4 sm:px-6 pb-6 sm:pb-8">
                        {/* Avatar Section */}
                        <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-12 sm:-mt-16 mb-4 sm:mb-6">
                            <div className="relative">
                                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border-4 border-white dark:border-zinc-900 bg-gray-200 dark:bg-zinc-800 overflow-hidden shadow-lg">
                                    {image ? (
                                        <Image
                                            src={image}
                                            alt={user.name || 'User'}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                                            <span className="text-3xl sm:text-4xl font-bold text-white">
                                                {getInitials(user.name)}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-zinc-900"></div>
                            </div>
                            
                            <div className="sm:ml-4 mt-3 sm:mt-0 text-center sm:text-left flex-1">
                                {isEditing ? (
                                    <form onSubmit={handleUpdate} className="flex flex-col gap-3 w-full">
                                        {/* Name Input */}
                                        <div>
                                            <label className="text-sm font-medium text-gray-700 dark:text-zinc-300 block mb-1">
                                                Full Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Enter your name"
                                                disabled={loading}
                                            />
                                        </div>
                                        
                                        {/* Image URL Input */}
                                        <div>
                                            <label className="text-sm font-medium text-gray-700 dark:text-zinc-300 block mb-1">
                                                Image URL
                                            </label>
                                            <input
                                                type="url"
                                                value={image}
                                                onChange={(e) => setImage(e.target.value)}
                                                className="w-full bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="http://imgbb.co/profilePic.png"
                                                disabled={loading}
                                            />
                                            <p className="text-xs text-gray-400 dark:text-zinc-500 mt-1">
                                                Enter a valid image URL (PNG, JPG, WEBP)
                                            </p>
                                        </div>
                                        
                                        {/* Action Buttons */}
                                        <div className="flex gap-2 mt-2">
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition disabled:opacity-50"
                                            >
                                                {loading ? 'Saving...' : 'Save Changes'}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setIsEditing(false);
                                                    setName(user.name || '');
                                                    setImage(user.image || '');
                                                    setError('');
                                                    setSuccess('');
                                                }}
                                                className="px-4 py-2 bg-gray-200 dark:bg-zinc-700 text-gray-700 dark:text-zinc-300 rounded-lg text-sm font-medium hover:bg-gray-300 dark:hover:bg-zinc-600 transition"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <>
                                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-zinc-100">
                                            {user.name || 'User'}
                                        </h1>
                                        <p className="text-sm text-gray-500 dark:text-zinc-400">
                                            {user.email || 'No email provided'}
                                        </p>
                                        <div className="flex items-center gap-2 mt-1">
                                            {/* Plan Badge */}
                                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${getPlanBadgeColor(user.plan)}`}>
                                                {getPlanIcon(user.plan)}
                                                {getPlanDisplayName(user.plan)}
                                            </span>
                                            <span className="text-xs text-gray-400 dark:text-zinc-500">
                                                Member since {formatDate(user.createdAt)}
                                            </span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Error & Success Messages */}
                        {error && (
                            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-lg">
                                <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
                            </div>
                        )}
                        {success && (
                            <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 rounded-lg">
                                <p className="text-sm text-green-700 dark:text-green-400">{success}</p>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-2 sm:gap-3 border-t border-gray-200 dark:border-zinc-800 pt-4">
                            {!isEditing && (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition shadow-sm hover:shadow-md"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                    </svg>
                                    Edit Profile
                                </button>
                            )}
                            <Link
                                href="/dashboard"
                                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-700 dark:text-zinc-300 rounded-lg text-sm font-medium transition"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                </svg>
                                Dashboard
                            </Link>
                            {user?.plan === 'free' &&
                                <>
                                    
                                    <Link
                                        href="/plans"
                                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-700 dark:text-zinc-300 rounded-lg text-sm font-medium transition"
                                    >
                                        <Gem />
                                        Plans
                                    </Link>
                                </>
                                
                            }
                            
                        </div>

                        {/* Profile Info Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-zinc-800">
                            <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-lg p-3">
                                <p className="text-xs text-gray-500 dark:text-zinc-400">Email</p>
                                <p className="text-sm font-medium text-gray-900 dark:text-zinc-100 truncate">
                                    {user.email || 'Not provided'}
                                </p>
                            </div>
                            <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-lg p-3">
                                <p className="text-xs text-gray-500 dark:text-zinc-400">Role</p>
                                <p className="text-sm font-medium text-gray-900 dark:text-zinc-100 capitalize">
                                    {user.role || 'User'}
                                </p>
                            </div>
                            <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-lg p-3">
                                <p className="text-xs text-gray-500 dark:text-zinc-400">Plan</p>
                                <div className="mt-1">
                                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${getPlanBadgeColor(user.plan)}`}>
                                        {getPlanIcon(user.plan)}
                                        {getPlanDisplayName(user.plan)}
                                    </span>
                                </div>
                            </div>
                            <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-lg p-3">
                                <p className="text-xs text-gray-500 dark:text-zinc-400">User ID</p>
                                <p className="text-sm font-medium text-gray-900 dark:text-zinc-100 truncate">
                                    {user.id || user._id || 'N/A'}
                                </p>
                            </div>
                            <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-lg p-3 sm:col-span-2">
                                <p className="text-xs text-gray-500 dark:text-zinc-400">Email Verified</p>
                                <p className="text-sm font-medium flex items-center gap-2">
                                    {user.emailVerified ? (
                                        <span className="text-green-600 dark:text-green-400 flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            Verified
                                        </span>
                                    ) : (
                                        <span className="text-yellow-600 dark:text-yellow-400 flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            Not Verified
                                        </span>
                                    )}
                                </p>
                            </div>
                            <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-lg p-3">
                                <p className="text-xs text-gray-500 dark:text-zinc-400">Joined</p>
                                <p className="text-sm font-medium text-gray-900 dark:text-zinc-100">
                                    {formatDate(user.createdAt)}
                                </p>
                            </div>
                            <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-lg p-3">
                                <p className="text-xs text-gray-500 dark:text-zinc-400">Last Updated</p>
                                <p className="text-sm font-medium text-gray-900 dark:text-zinc-100">
                                    {formatDate(user.updatedAt)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
// 'use client';
// import { authClient } from '@/lib/auth-client';
// import React, { useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { userProfileUpdate } from '@/lib/actions/allUpdate';
// import { useRouter } from 'next/navigation';

// const ProfilePage = () => {
//     const session = authClient.useSession();
//     console.log(session.data, 'session');
//     const user = session.data?.user;
//     const router = useRouter();
    
//     const [isEditing, setIsEditing] = useState(false);
//     const [name, setName] = useState(user?.name || '');
//     const [image, setImage] = useState(user?.image || '');
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');

//     // Handle update profile
//     const handleUpdate = async (e) => {
//         e.preventDefault();
//         if (!name.trim()) {
//             setError('Name is required');
//             return;
//         }
        
//         setLoading(true);
//         setError('');
//         setSuccess('');

//         try {
//             const updateData = { 
//                 name: name.trim(),
//                 image: image.trim() || ''
//             };
            
//             const response = await userProfileUpdate(user?.id, updateData);
            
//             if (response.success) {
//                 setSuccess('Profile updated successfully!');
//                 setIsEditing(false);
//                 await session.refetch();
//                 router.push('/dashboard/user/profile');
//             } else {
//                 setError(response.message || 'Failed to update profile');
//             }
//         } catch (error) {
//             setError('An error occurred. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (!user) {
//         return (
//             <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center">
//                 <div className="text-center">
//                     <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
//                     <p className="mt-4 text-gray-600 dark:text-zinc-400">Loading profile...</p>
//                 </div>
//             </div>
//         );
//     }

//     // Format date
//     const formatDate = (dateString) => {
//         if (!dateString) return 'N/A';
//         return new Date(dateString).toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric'
//         });
//     };

//     // Get initials for avatar
//     const getInitials = (name) => {
//         if (!name) return 'U';
//         return name.charAt(0).toUpperCase();
//     };

//     return (
//         <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 py-6 sm:py-8 px-3 sm:px-6 lg:px-8">
//             <div className="max-w-3xl mx-auto">
//                 {/* Profile Card */}
//                 <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg dark:shadow-xl dark:shadow-zinc-900/50 border border-gray-200 dark:border-zinc-800 overflow-hidden">
                    
//                     {/* Cover Image */}
//                     <div className="h-24 sm:h-32 md:h-40 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700"></div>
                    
//                     {/* Profile Content */}
//                     <div className="px-4 sm:px-6 pb-6 sm:pb-8">
//                         {/* Avatar Section */}
//                         <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-12 sm:-mt-16 mb-4 sm:mb-6">
//                             <div className="relative">
//                                 <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border-4 border-white dark:border-zinc-900 bg-gray-200 dark:bg-zinc-800 overflow-hidden shadow-lg">
//                                     {image ? (
//                                         <Image
//                                             src={image}
//                                             alt={user.name || 'User'}
//                                             fill
//                                             className="object-cover"
//                                         />
//                                     ) : (
//                                         <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
//                                             <span className="text-3xl sm:text-4xl font-bold text-white">
//                                                 {getInitials(user.name)}
//                                             </span>
//                                         </div>
//                                     )}
//                                 </div>
//                                 <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-zinc-900"></div>
//                             </div>
                            
//                             <div className="sm:ml-4 mt-3 sm:mt-0 text-center sm:text-left flex-1">
//                                 {isEditing ? (
//                                     <form onSubmit={handleUpdate} className="flex flex-col gap-3 w-full">
//                                         {/* Name Input */}
//                                         <div>
//                                             <label className="text-sm font-medium text-gray-700 dark:text-zinc-300 block mb-1">
//                                                 Full Name <span className="text-red-500">*</span>
//                                             </label>
//                                             <input
//                                                 type="text"
//                                                 value={name}
//                                                 onChange={(e) => setName(e.target.value)}
//                                                 className="w-full bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                                 placeholder="Enter your name"
//                                                 disabled={loading}
//                                             />
//                                         </div>
                                        
//                                         {/* Image URL Input */}
//                                         <div>
//                                             <label className="text-sm font-medium text-gray-700 dark:text-zinc-300 block mb-1">
//                                                 Image URL
//                                             </label>
//                                             <input
//                                                 type="url"
//                                                 value={image}
//                                                 onChange={(e) => setImage(e.target.value)}
//                                                 className="w-full bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                                 placeholder="http://imgbb.co/profilePic.png"
//                                                 disabled={loading}
//                                             />
//                                             <p className="text-xs text-gray-400 dark:text-zinc-500 mt-1">
//                                                 Enter a valid image URL (PNG, JPG, WEBP)
//                                             </p>
//                                         </div>
                                        
//                                         {/* Action Buttons */}
//                                         <div className="flex gap-2 mt-2">
//                                             <button
//                                                 type="submit"
//                                                 disabled={loading}
//                                                 className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition disabled:opacity-50"
//                                             >
//                                                 {loading ? 'Saving...' : 'Save Changes'}
//                                             </button>
//                                             <button
//                                                 type="button"
//                                                 onClick={() => {
//                                                     setIsEditing(false);
//                                                     setName(user.name || '');
//                                                     setImage(user.image || '');
//                                                     setError('');
//                                                     setSuccess('');
//                                                 }}
//                                                 className="px-4 py-2 bg-gray-200 dark:bg-zinc-700 text-gray-700 dark:text-zinc-300 rounded-lg text-sm font-medium hover:bg-gray-300 dark:hover:bg-zinc-600 transition"
//                                             >
//                                                 Cancel
//                                             </button>
//                                         </div>
//                                     </form>
//                                 ) : (
//                                     <>
//                                         <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-zinc-100">
//                                             {user.name || 'User'}
//                                         </h1>
//                                         <p className="text-sm text-gray-500 dark:text-zinc-400">
//                                             {user.email || 'No email provided'}
//                                         </p>
//                                         <p className="text-xs text-gray-400 dark:text-zinc-500 mt-1">
//                                             Member since {formatDate(user.createdAt)}
//                                         </p>
//                                     </>
//                                 )}
//                             </div>
//                         </div>

//                         {/* Error & Success Messages */}
//                         {error && (
//                             <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-lg">
//                                 <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
//                             </div>
//                         )}
//                         {success && (
//                             <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 rounded-lg">
//                                 <p className="text-sm text-green-700 dark:text-green-400">{success}</p>
//                             </div>
//                         )}

//                         {/* Action Buttons */}
//                         <div className="flex flex-wrap gap-2 sm:gap-3 border-t border-gray-200 dark:border-zinc-800 pt-4">
//                             {!isEditing && (
//                                 <button
//                                     onClick={() => setIsEditing(true)}
//                                     className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition shadow-sm hover:shadow-md"
//                                 >
//                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//                                         <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
//                                     </svg>
//                                     Edit Profile
//                                 </button>
//                             )}
//                             <Link
//                                 href="/dashboard"
//                                 className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-700 dark:text-zinc-300 rounded-lg text-sm font-medium transition"
//                             >
//                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//                                     <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
//                                 </svg>
//                                 Dashboard
//                             </Link>
//                         </div>

//                         {/* Profile Info Grid */}
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-zinc-800">
//                             <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-lg p-3">
//                                 <p className="text-xs text-gray-500 dark:text-zinc-400">Email</p>
//                                 <p className="text-sm font-medium text-gray-900 dark:text-zinc-100 truncate">
//                                     {user.email || 'Not provided'}
//                                 </p>
//                             </div>
//                             <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-lg p-3">
//                                 <p className="text-xs text-gray-500 dark:text-zinc-400">Role</p>
//                                 <p className="text-sm font-medium text-gray-900 dark:text-zinc-100 capitalize">
//                                     {user.role || 'User'}
//                                 </p>
//                             </div>
//                             <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-lg p-3">
//                                 <p className="text-xs text-gray-500 dark:text-zinc-400">Plan</p>
//                                 <p className="text-sm font-medium text-gray-900 dark:text-zinc-100 capitalize">
//                                     {user.plan || 'Free'}
//                                 </p>
//                             </div>
//                             <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-lg p-3">
//                                 <p className="text-xs text-gray-500 dark:text-zinc-400">User ID</p>
//                                 <p className="text-sm font-medium text-gray-900 dark:text-zinc-100 truncate">
//                                     {user.id || user._id || 'N/A'}
//                                 </p>
//                             </div>
//                             <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-lg p-3 sm:col-span-2">
//                                 <p className="text-xs text-gray-500 dark:text-zinc-400">Email Verified</p>
//                                 <p className="text-sm font-medium flex items-center gap-2">
//                                     {user.emailVerified ? (
//                                         <span className="text-green-600 dark:text-green-400 flex items-center gap-1">
//                                             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//                                                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                                             </svg>
//                                             Verified
//                                         </span>
//                                     ) : (
//                                         <span className="text-yellow-600 dark:text-yellow-400 flex items-center gap-1">
//                                             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//                                                 <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                                             </svg>
//                                             Not Verified
//                                         </span>
//                                     )}
//                                 </p>
//                             </div>
//                             <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-lg p-3">
//                                 <p className="text-xs text-gray-500 dark:text-zinc-400">Joined</p>
//                                 <p className="text-sm font-medium text-gray-900 dark:text-zinc-100">
//                                     {formatDate(user.createdAt)}
//                                 </p>
//                             </div>
//                             <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-lg p-3">
//                                 <p className="text-xs text-gray-500 dark:text-zinc-400">Last Updated</p>
//                                 <p className="text-sm font-medium text-gray-900 dark:text-zinc-100">
//                                     {formatDate(user.updatedAt)}
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProfilePage;





// 'use client';
// import { authClient } from '@/lib/auth-client';
// import React, { useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { userProfileUpdate } from '@/lib/actions/allUpdate';
// import { useRouter } from 'next/navigation';
// const SERVER_URL = process.env.SERVER_URL;
// const ProfilePage = () => {
//     const session = authClient.useSession();
//     console.log(session.data, 'session');
//     const user = session.data?.user;
//     const router = useRouter()
//     const [isEditing, setIsEditing] = useState(false);
//     const [name, setName] = useState(user?.name || '');
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');
    
//     const handleUpdate = async (e) => {
//         e.preventDefault();
//         if (!name.trim()) {
//             setError('Name is required');
//             return;
//         }
//         setLoading(true);
//         setError('');
//         setSuccess('');
        
//         try {
//             // const response = await fetch(`${SERVER_URL}/api/auth/update-profile/${user?.id}`, {
//             //     method: 'PATCH',
//             //     headers: { 'Content-Type': 'application/json' },
//             //     body: JSON.stringify({ name: name.trim() }),
//             // });
//             const response = await userProfileUpdate(user?.id, { name: name.trim() });
//             //const data = await response.json();
//             if (response.success) {
//                 setSuccess('Profile updated successfully!');
//                 setIsEditing(false);
//                 //router.push('/dashboard/user')
//                 // Refresh session
//                 await session.refetch();
//                 router.push('/dashboard/user/profile')
//             } else {
//                 setError(data.message || 'Failed to update profile');
//             }
//         } catch (error) {
//             setError('An error occurred. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (!user) {
//         return (
//             <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center">
//                 <div className="text-center">
//                     <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
//                     <p className="mt-4 text-gray-600 dark:text-zinc-400">Loading profile...</p>
//                 </div>
//             </div>
//         );
//     }

//     // Format date
//     const formatDate = (dateString) => {
//         if (!dateString) return 'N/A';
//         return new Date(dateString).toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric'
//         });
//     };

//     // Get initials for avatar
//     const getInitials = (name) => {
//         if (!name) return 'U';
//         return name.charAt(0).toUpperCase();
//     };

//     return (
//         <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 py-6 sm:py-8 px-3 sm:px-6 lg:px-8">
//             <div className="max-w-3xl mx-auto">
//                 {/* Profile Card */}
//                 <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg dark:shadow-xl dark:shadow-zinc-900/50 border border-gray-200 dark:border-zinc-800 overflow-hidden">
                    
//                     {/* Cover Image */}
//                     <div className="h-24 sm:h-32 md:h-40 bg-linear-to-r from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700"></div>
                    
//                     {/* Profile Content */}
//                     <div className="px-4 sm:px-6 pb-6 sm:pb-8">
//                         {/* Avatar Section */}
//                         <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-12 sm:-mt-16 mb-4 sm:mb-6">
//                             <div className="relative">
//                                 <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border-4 border-white dark:border-zinc-900 bg-gray-200 dark:bg-zinc-800 overflow-hidden shadow-lg">
//                                     {user.image ? (
//                                         <Image
//                                             src={user.image}
//                                             alt={user.name || 'User'}
//                                             fill
//                                             className="object-cover"
//                                         />
//                                     ) : (
//                                         <div className="w-full h-full bg-linear-to-br from-blue-400 to-purple-500 flex items-center justify-center">
//                                             <span className="text-3xl sm:text-4xl font-bold text-white">
//                                                 {getInitials(user.name)}
//                                             </span>
//                                         </div>
//                                     )}
//                                 </div>
//                                 <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-zinc-900"></div>
//                             </div>
                            
//                             <div className="sm:ml-4 mt-3 sm:mt-0 text-center sm:text-left flex-1">
//                                 {isEditing ? (
//                                     <form onSubmit={handleUpdate} className="flex flex-col sm:flex-row gap-2">
//                                         <input
//                                             type="text"
//                                             value={name}
//                                             onChange={(e) => setName(e.target.value)}
//                                             className="flex-1 bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                             placeholder="Enter your name"
//                                             disabled={loading}
//                                         />
//                                         <div className="flex gap-2">
//                                             <button
//                                                 type="submit"
//                                                 disabled={loading}
//                                                 className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition disabled:opacity-50"
//                                             >
//                                                 {loading ? 'Saving...' : 'Save'}
//                                             </button>
//                                             <button
//                                                 type="button"
//                                                 onClick={() => {
//                                                     setIsEditing(false);
//                                                     setName(user.name || '');
//                                                     setError('');
//                                                     setSuccess('');
//                                                 }}
//                                                 className="px-4 py-2 bg-gray-200 dark:bg-zinc-700 text-gray-700 dark:text-zinc-300 rounded-lg text-sm font-medium hover:bg-gray-300 dark:hover:bg-zinc-600 transition"
//                                             >
//                                                 Cancel
//                                             </button>
//                                         </div>
//                                     </form>
//                                 ) : (
//                                     <>
//                                         <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-zinc-100">
//                                             {user.name || 'User'}
//                                         </h1>
//                                         <p className="text-sm text-gray-500 dark:text-zinc-400">
//                                             {user.email || 'No email provided'}
//                                         </p>
//                                         <p className="text-xs text-gray-400 dark:text-zinc-500 mt-1">
//                                             Member since {formatDate(user.createdAt)}
//                                         </p>
//                                     </>
//                                 )}
//                             </div>
//                         </div>

//                         {/* Error & Success Messages */}
//                         {error && (
//                             <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-lg">
//                                 <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
//                             </div>
//                         )}
//                         {success && (
//                             <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 rounded-lg">
//                                 <p className="text-sm text-green-700 dark:text-green-400">{success}</p>
//                             </div>
//                         )}

//                         {/* Action Buttons */}
//                         <div className="flex flex-wrap gap-2 sm:gap-3 border-t border-gray-200 dark:border-zinc-800 pt-4">
//                             {!isEditing && (
//                                 <button
//                                     onClick={() => setIsEditing(true)}
//                                     className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition shadow-sm hover:shadow-md"
//                                 >
//                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//                                         <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
//                                     </svg>
//                                     Edit Profile
//                                 </button>
//                             )}
//                             <Link
//                                 href="/dashboard"
//                                 className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-700 dark:text-zinc-300 rounded-lg text-sm font-medium transition"
//                             >
//                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//                                     <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
//                                 </svg>
//                                 Dashboard
//                             </Link>
//                         </div>

//                         {/* Profile Info Grid */}
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-zinc-800">
//                             <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-lg p-3">
//                                 <p className="text-xs text-gray-500 dark:text-zinc-400">Email</p>
//                                 <p className="text-sm font-medium text-gray-900 dark:text-zinc-100 truncate">
//                                     {user.email || 'Not provided'}
//                                 </p>
//                             </div>
//                             <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-lg p-3">
//                                 <p className="text-xs text-gray-500 dark:text-zinc-400">Role</p>
//                                 <p className="text-sm font-medium text-gray-900 dark:text-zinc-100 capitalize">
//                                     {user.role || 'User'}
//                                 </p>
//                             </div>
//                             <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-lg p-3">
//                                 <p className="text-xs text-gray-500 dark:text-zinc-400">Plan</p>
//                                 <p className="text-sm font-medium text-gray-900 dark:text-zinc-100 capitalize">
//                                     {user.plan || 'Free'}
//                                 </p>
//                             </div>
//                             <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-lg p-3">
//                                 <p className="text-xs text-gray-500 dark:text-zinc-400">User ID</p>
//                                 <p className="text-sm font-medium text-gray-900 dark:text-zinc-100 truncate">
//                                     {user.id || user._id || 'N/A'}
//                                 </p>
//                             </div>
//                             <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-lg p-3 sm:col-span-2">
//                                 <p className="text-xs text-gray-500 dark:text-zinc-400">Email Verified</p>
//                                 <p className="text-sm font-medium flex items-center gap-2">
//                                     {user.emailVerified ? (
//                                         <span className="text-green-600 dark:text-green-400 flex items-center gap-1">
//                                             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//                                                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                                             </svg>
//                                             Verified
//                                         </span>
//                                     ) : (
//                                         <span className="text-yellow-600 dark:text-yellow-400 flex items-center gap-1">
//                                             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//                                                 <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                                             </svg>
//                                             Not Verified
//                                         </span>
//                                     )}
//                                 </p>
//                             </div>
//                             <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-lg p-3">
//                                 <p className="text-xs text-gray-500 dark:text-zinc-400">Joined</p>
//                                 <p className="text-sm font-medium text-gray-900 dark:text-zinc-100">
//                                     {formatDate(user.createdAt)}
//                                 </p>
//                             </div>
//                             <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-lg p-3">
//                                 <p className="text-xs text-gray-500 dark:text-zinc-400">Last Updated</p>
//                                 <p className="text-sm font-medium text-gray-900 dark:text-zinc-100">
//                                     {formatDate(user.updatedAt)}
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProfilePage;
