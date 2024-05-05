import React, { useState, useEffect } from 'react';
import usersController from '../../services/user.service';
import useLocalStorage from '../../hooks/useLocalStorage';

const UserByID = ({userId}) => {
    const [getToken, _] = useLocalStorage()
    const [user, setUser] = useState();

    useEffect(() => {
        const fetchUsersByID = async () => {
            try {
                const userData = await usersController.getUserByID(getToken('token'), userId);
                setUser(userData);
            } catch (error) {
                console.error('Error fetching user by id:', error);
            }
        };
        fetchUsersByID();
    }, [userId]);

    
    return (
        <div className='holidaysParent'>
            {user?.firstname}
        </div>
    );
};

export default UserByID;
