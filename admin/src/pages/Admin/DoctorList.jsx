import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/adminContext'

const DoctorList = () => {

  // Here we are going to create a UI for all doctor list 
  const {doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext)

  useEffect( () => {
    if(aToken){
       getAllDoctors()
    }

  }, [aToken])
  
  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
        <div className=' w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {
        doctors.map( (item, index) => (
            <div className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
              <img src={item.image} className='bg-indigo-50 hover:bg-primary transition-all
              duration-300' alt="doctors-Image" />
                {/* displaying doctor name,speciality, availability */}

                <div className='p-4'>
                 <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
                  <p className='text-zinc-600 text-sm'>{item.speciality}</p>
                {/* availability */}
                <div className='mt-2 flex items-center gap-1 text-sm'>
                  <input onChange={() => changeAvailability(item._id)} type="checkbox" checked={item.available} />
                  <p>Available</p>
                </div>
                </div>
            </div>
      
        ))
      }
        </div>
    </div>
  )
}

export default DoctorList