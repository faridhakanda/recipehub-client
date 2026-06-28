import { getAllUsers } from '@/lib/actions/allGet';
import React from 'react';

const AdminPage = async() => {
    const users = await getAllUsers();
    return (
        <div>
            <h2>Admin Page</h2>
            <div>
                <h2>Total user: {users.length}</h2>
            </div>
        </div>
    );
};

export default AdminPage;