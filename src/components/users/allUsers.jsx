import React, { useState, useEffect } from 'react';
import usersController from '../../services/user.service';
import useLocalStorage from '../../hooks/useLocalStorage';
import UserByID from './usersByID';

const AllUsers = () => {
    const [getToken, _] = useLocalStorage();
    const [users, setUsers] = useState([]);
    const [orderedBy, setOrderedBy] = useState("");
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await usersController.getAllUsers(getToken('token'));
                setUsers(usersData);
            } catch (error) {
                console.error('Error fetching holidays:', error);
            }
        };
        fetchUsers();
    }, []);

    const orderByString = (sorting) => {
        if (orderedBy !== "ASC") {
            let holidaysASC = users.sort((a, b) => Reflect.get(a, sorting).localeCompare(Reflect.get(b, sorting)));
            setOrderedBy("ASC")
            return setUsers([...holidaysASC])
        } else if (orderedBy !== "DESC") {
            let holidaysDESC = users.sort((a, b) => Reflect.get(b, sorting).localeCompare(Reflect.get(a, sorting)));
            setOrderedBy("DESC")
            return setUsers([...holidaysDESC])
        }
        return setOrderedBy("")
    }
    const orderByNumber = (sorting) => {
        if (orderedBy !== "ASC") {
            let holidaysASC = users.sort((a, b) => Reflect.get(a, sorting) - (Reflect.get(b, sorting)));
            setOrderedBy("ASC")
            return setUsers([...holidaysASC])
        } else if (orderedBy !== "DESC") {
            let holidaysDESC = users.sort((a, b) => Reflect.get(b, sorting) - (Reflect.get(a, sorting)));
            setOrderedBy("DESC")
            return setUsers([...holidaysDESC])
        }
        return setOrderedBy("")
    }
    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    };
    const onClickUser = (id) => {
        let userByID = users.filter((u) => u.id == id);
        if (userByID.length > 0) {
            setUserId(id)
        }
    }
    return (
        <div>
            <div className='holidaysParent'>
                <div>
                    <table>
                        <caption>Users list</caption>
                        <thead>
                            <tr>
                                <th className={`orderBy ${orderedBy}`} onClick={() => orderByNumber("id")}>ID</th>
                                <th className={`orderBy ${orderedBy}`} onClick={() => orderByString("firstname")}>Firstname</th>
                                <th>Lastname</th>
                                <th className={`orderBy ${orderedBy}`} onClick={() => orderByString("email")}>Email</th>
                                <th>Entry Date</th>
                                <th className={`orderBy ${orderedBy}`} onClick={() => orderByNumber("maxholidays")}>Max Holidays</th>
                                <th className={`orderBy ${orderedBy}`} onClick={() => orderByNumber("holidaysleft")}>Holidays Left</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(({ id, firstname, lastname, email, entrydate, maxholidays, holidaysleft }) => (
                                <tr key={id} onClick={() => onClickUser(`${id}`)}>
                                    <td>{id}</td>
                                    <td>{firstname}</td>
                                    <td>{lastname}</td>
                                    <td>{email}</td>
                                    <td>{formatDate(entrydate)}</td>
                                    <td>{maxholidays}</td>
                                    <td>{holidaysleft}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {userId && (
                <UserByID userId={userId} />
            )}
        </div>
    );
};

export default AllUsers;
