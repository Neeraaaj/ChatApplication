import React, { useState } from 'react'
import { useAuth } from '../utils/AuthContext'
import { Link } from 'react-router-dom'

const RegisterPage = () => {
    const {handleUserRegister} = useAuth()

    const [credentials, setCredentials] = useState({
        name:'',
        email: '',
        password1: '',
        password2: ''
    })

    const handleInputChange = (e) => {
        let name = e.target.name
        let value = e.target.value
    
        setCredentials({...credentials, [name]:value})
        console.log(credentials)
      }
  return (
    <div className='auth--container2' style={{padding: "30px"}}>
      <div className='form--wrapper'>
        <h1 style={{color: "white", display: "flex", fontSize: "2.5vw"}}>ANONYMOUS CHAT ROOM</h1>
        <form onSubmit={(e) => {handleUserRegister(e,credentials)}}>
            <div className='field--wrapper'>
                <label>UserName: </label>
                <input type='text'
                required
                placeholder='Name'
                name='name'
                value={credentials.name}
                onChange={handleInputChange}
                />
            </div>
          
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
              name='password1'
              value={credentials.password1}
              onChange={handleInputChange}
            />
          </div>

          <div className='field--wrapper'>
            <label>Confirm Password: </label>
            <input type='password'
              required
              placeholder='Confirm your Password'
              name='password2'
              value={credentials.password2}
              onChange={handleInputChange}
            />
          </div>

          <div className='field--wrapper'>
            <input type='submit' className='btn btn--lg btn--main'placeholder='Register'/>
          </div>
        
            <p>Already have an account? Login <Link to="/login">here</Link></p>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage