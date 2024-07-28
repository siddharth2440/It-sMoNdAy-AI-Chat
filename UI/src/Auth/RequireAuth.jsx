import { useAuth } from '@clerk/clerk-react'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const RequireAuth = () => {
   const { userId , isLoaded , getToken } = useAuth()
   console.log(isLoaded);
  return (
    <>
     {
        (userId || !isLoaded) ? (
            <Outlet/>
         ) : (
            <Navigate to={"/sign-in"}/>
         )
     }
    </>
  )
}

export default RequireAuth