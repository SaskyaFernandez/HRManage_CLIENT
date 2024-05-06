import React, { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import usersController from "../services/user.service";

const Context = React.createContext(undefined);

const CurrentUserContext = (props) => {
    const [user, setUser] = useState("");
    const [getFromLocalStorage, _] = useLocalStorage();

    const fetchUser = async () => {
        if (getFromLocalStorage("token")) {
            if (!user) {
                const token = getFromLocalStorage("token");
                const id = getFromLocalStorage("id");
                const userById = await usersController.getUserByID(token, id);
                setUser(userById);
            }
        }
    };

    fetchUser();

    const exposedValues = {
        user: user,
        setUser: setUser
    };

    return (
        <Context.Provider value={exposedValues}>
            {props.children}
        </Context.Provider>
    );
};

export { Context, CurrentUserContext };
export default Context;
