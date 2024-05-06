import { useContext } from "react";
import Context from "../contexts/CurrentUserContext";


const Profil = () => {
    const currentUserContext = useContext(Context)


    return (
        <div>
            {currentUserContext.user?.firstname}
        </div>
    );
};

export default Profil;
