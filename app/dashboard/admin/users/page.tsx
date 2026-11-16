import { getUsers } from '@/lib/api/user';
import React from 'react';


const UsersPage = async() => {
    const users = await getUsers()
    console.log(users);
    return (
        <div>
            user 
        </div>
    );
};

export default UsersPage;