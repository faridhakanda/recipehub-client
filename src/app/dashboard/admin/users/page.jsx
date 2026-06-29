
import { getAllUsers } from '@/lib/actions/allGet';

import UserCard from '../ui/UserCard';

const AdminPage = async () => {
    const users = await getAllUsers();
    
    // Convert users to plain objects for client component
    const usersData = users.map(user => ({
        ...user,
        _id: user._id?.toString() || user._id,
    }));

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 py-8 md:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2>Total User: {users.length}</h2>
                {users.map(user => 
                    <div key={user?._id}>
                        <UserCard user={user} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPage;