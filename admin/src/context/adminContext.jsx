import { createContext, useState } from "react";

export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'');

    const backEndUrl = import.meta.env.VITE_BACKEND_URL
    console.log("Backendurl", backEndUrl);
    


   const value = {
        aToken, setAToken,
        backEndUrl
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )

}

export default AdminContextProvider