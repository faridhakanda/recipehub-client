'use client';

import { useState } from 'react';
import { userDelete } from '@/lib/actions/allDelete';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

const UserCard = ({ user, onDelete }) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleDeleteUser = async () => {
        // Confirm before deleting
        if (!confirm(`Are you sure you want to delete ${user?.name || 'this user'}?`)) {
            return;
        }

        setLoading(true);
        try {
            const response = await userDelete(user?._id);
            
            if (response?.success) {
                toast.success('User deleted successfully!');
                // Call onDelete callback to refresh the list
                if (onDelete) onDelete(user?._id);
                // Or redirect
                // router.refresh();
            } else {
                toast.error(response?.message || 'Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error('Failed to delete user');
        } finally {
            setLoading(false);
        }
    };

    // Get initials for avatar
    const getInitials = (name) => {
        if (!name) return 'U';
        return name.charAt(0).toUpperCase();
    };

    // Get role badge color
    const getRoleColor = (role) => {
        const colors = {
            admin: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
            user: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
            moderator: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
        };
        return colors[role] || colors.user;
    };

    // Get status badge
    const getStatusBadge = (user) => {
        if (user?.status === 'blocked') {
            return (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                    Blocked
                </span>
            );
        }
        return (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                Active
            </span>
        );
    };

    return (
        <div className="bg-white my-1 dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800 hover:shadow-md transition-all duration-200 p-4">
            <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-lg font-bold">
                        {getInitials(user?.name)}
                    </div>
                </div>
                
                {/* User Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                            {user?.name || 'Unknown User'}
                        </h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user?.role)}`}>
                            {user?.role || 'user'}
                        </span>
                        {getStatusBadge(user)}
                    </div>
                    
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {user?.email || 'No email'}
                    </p>
                    <div className="flex flex-wrap gap-3 mt-1 text-xs text-gray-400 dark:text-gray-500">
                        <span>ID: {user?._id?.slice(-6) || 'N/A'}</span>
                        {user?.plan && (
                            <span className="capitalize">Plan: {user.plan}</span>
                        )}
                        {user?.createdAt && (
                            <span>
                                Joined: {new Date(user.createdAt).toLocaleDateString()}
                            </span>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex-shrink-0">
                    <button
                        onClick={handleDeleteUser}
                        disabled={loading}
                        className={`px-3 py-1.5 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors flex items-center gap-1 ${
                            loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Deleting...
                            </>
                        ) : (
                            'Delete'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserCard;