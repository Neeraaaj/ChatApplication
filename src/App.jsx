import './App.css'
import Room from './pages/Room'
import Login from './pages/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PrivateRoutes from './components/PrivateRoutes'
import { AuthProvider } from './utils/AuthContext'
import RegisterPage from './pages/RegisterPage'
import { useEffect } from 'react'
import jsonp from 'jsonp'

function App() {
<<<<<<< HEAD
  useEffect(() => {
    // Replace 'your-api-endpoint' with the actual API endpoint
    const url = 'https://cloud.appwrite.io/v1/account/sessions/email?callback=myCallbackFunction';

    jsonp(url, { name: 'myCallbackFunction' }, (err, data) => {
      if (err) {
        console.error(err);
      } else {
        console.log(data);
      }
    });
  }, []);
=======
>>>>>>> 10a6e1ee233b8535ace8dc2ed671dd8f5d2b4752
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<RegisterPage />}  />        
          <Route element={<PrivateRoutes />} >
            <Route path='/' element={<Room />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
