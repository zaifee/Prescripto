import { createContext, useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'
export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'');
    const [doctors, setDoctors] = useState([])

    const backEndUrl = import.meta.env.VITE_BACKEND_URL
    console.log("Backendurl", backEndUrl);

    const getAllDoctors = async(req, res) => {
         
            try {
                const {data} = await axios.post(backEndUrl + '/api/admin/all-doctors', {}, {headers: {aToken}});

            if(data.success){
                setDoctors(data.doctors);
                console.log(data.doctors);
                
            }else{
                toast.error(data.message);

            }

        } catch (error) {
            toast.error(error.message)        
            }
       
    }

    // changing availability of doctor using api 
    const changeAvailability = async(docId) => {
        try {
            const { data } = await axios.post(backEndUrl + '/api/admin//change-availability',{docId}, {headers:{aToken}})
            if(data.success){
                toast.success("Availability Changed")
                getAllDoctors(); //updating get all doctors 
            }else{
                toast.error(data.message)
            }
                        

            
        } catch (error) {
            console.log(error);
            toast.error("Error Occured Changing Availability")
            
        }
    }
  



   const value = {
        aToken, setAToken,
        backEndUrl, 
        doctors,
        getAllDoctors,
        changeAvailability
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )

}

export default AdminContextProvider