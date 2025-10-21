import React from 'react'
import {useSelector} from 'react-redux'
import { Outlet,Navigate } from 'react-router-dom'

function PrivateRoute() {

    const{currentUser} = useSelector(state => state.user)

  return currentUser ? <Outlet/> : <Navigate to={'/sign-in'}/> // outlet means ist going to child compomnet
}

export default PrivateRoute
