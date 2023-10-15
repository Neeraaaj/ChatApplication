import React from 'react'
import { User } from 'react-feather'
import { LogOut } from 'react-feather'
import Login from '../pages/Login'
import { useActionData } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext'
import { useNavigate } from 'react-router-dom'

export const Header = () => {
    const {user, handleUserLogout} = useAuth()
    const navigate = useNavigate()
    const handleOnClick = () => {
        navigate('/login')
    }
  return (
    <div id='header--wrapper'>
        {user ? (
            <>
                Welcome {user.name}
                <LogOut  onClick={handleUserLogout}
                className='header--link'/>
            </>
        ): (
            navigate('/login')
        )}
    </div>
  )
}
