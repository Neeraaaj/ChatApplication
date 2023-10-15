import React, {useEffect, useState} from 'react'
import { useAuth } from '../utils/AuthContext'
import { useNavigate, Navigate, Link} from 'react-router-dom'

const Login = () => {
  const {user, handleUserLogin} = useAuth()
  const navigate = useNavigate()

  const [credentials, setCredentials] = useState({email: '', password: ''})

  useEffect(() => {
    if(user){
      navigate('/')
    }
  }, [])

  const handleInputChange = (e) => {
    let name = e.target.name
    let value = e.target.value

    setCredentials({...credentials, [name]:value})
    console.log(credentials)
  }

  return (
    <div className='auth--container'>
      <div className='backdrop'></div>
      <div className='form--wrapper'>
        <form onSubmit={(e) => {handleUserLogin(e,credentials)}}>
          <div className='field--wrapper'>
            <label>Email: </label>
            <input type='email'
              required
              placeholder='email'
              name='email'
              value={credentials.email}
              onChange={handleInputChange}
            />
          </div>

          <div className='field--wrapper'>
            <label>Password: </label>
            <input type='password'
              required
              placeholder='Password'
              name='password'
              value={credentials.password}
              onChange={handleInputChange}
            />
          </div>

          <div className='field--wrapper'>
            <input type='submit' className='btn btn--lg btn--main'placeholder='Submit'/>
          </div>

          <p>Don't have an account yet? Register <Link to="/register">here</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Login