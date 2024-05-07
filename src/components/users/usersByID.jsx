import React, { useState, useEffect } from 'react';
import usersController from '../../services/user.service';
import useLocalStorage from '../../hooks/useLocalStorage';

const UserByID = ({ userId, isSlided }) => {
    const [getLocalStorage, _] = useLocalStorage();
    const [user, setUser] = useState();

    useEffect(() => {
        const fetchUserByID = async () => {
            try {
                const userData = await usersController.getUserByID(getLocalStorage('token'), userId);
                console.log("oui");
                setUser(userData);
            } catch (error) {
                console.error('Error fetching user by id:', error);
            }
        };
        fetchUserByID();
    }, [getLocalStorage(), userId]);

    console.log(isSlided);


    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    };

    if (!user) {
        return (
            <div className='holidaysParent'>
                <p>Chargement...</p>
            </div>
        );
    }

    return (
        <div className={`${userId !== getLocalStorage("id") ? "userIdDialog" : "userParent"} ${isSlided && "slideDetailUser"}`}>
            <div className='image-centred'>
                <img src={user.image} alt="" srcset="" />
            </div>
            <p> Firstname : {user.firstname}</p>
            <p>Lastname : {user.lastname}</p>
            <p>Email: {user.email}</p>
            <p>Entry date : {formatDate(user.entrydate)}</p>
            <p>Max holidays : {user.maxholidays}</p>
            <p>Holidays Left :{user.holidaysleft}</p>
        </div>
    );
};

export default UserByID;
