import React, { useState, useEffect } from 'react';
import usersController from '../../services/user.service';
import useLocalStorage from '../../hooks/useLocalStorage';

const AllUsers = ({ handleClickUser }) => {
    const [getToken, _] = useLocalStorage();
    const [users, setUsers] = useState([]);
    const [orderedBy, setOrderedBy] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await usersController.getAllUsers(getToken('token'));
                console.log(usersData);
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

    const onClickUser = (id) => {
        handleClickUser(id);
    }

    return (
        <div>
            <div className='userParent'>
                <div>
                    <table>
                        <caption>Users list</caption>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th className={`orderBy ${orderedBy}`} onClick={() => orderByString("firstname")}>Firstname</th>
                                <th>Lastname</th>
                                <th className={`orderBy ${orderedBy}`} onClick={() => orderByString("email")}>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(({ id, firstname, lastname, email }) => (
                                <tr key={id} onClick={() => onClickUser(id)}>
                                    <td>{id}</td>
                                    <td>{firstname}</td>
                                    <td>{lastname}</td>
                                    <td>{email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;
