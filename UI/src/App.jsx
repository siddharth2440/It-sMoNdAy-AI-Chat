import { Route, Routes } from 'react-router-dom'
import './App.css'
import RootLayout from './Layouts/RootLayout.jsx'
import Home from './Pages/Home.jsx'
import Signin from './Pages/Signin.jsx'
import Signup from './Pages/Signup.jsx'
import RequireAuth from './Auth/RequireAuth.jsx'
import DashboardLayout from './Layouts/DashboardLayout.jsx'
import DashBoard from './Pages/DashBoard.jsx'
import Notfound from './Components/Notfound.jsx'

function App() {

  return (
    <Routes>
      {/* <RootLayout/> */}
      <Route path='/' element={<Home/>}></Route>
      <Route path='/sign-in' element={<Signin/>}></Route>
      <Route path='/sign-up' element={<Signup/>}></Route>

      <Route element={<RequireAuth/>}>
        <Route path='/dashboard' element={<DashBoard/>}></Route>
      </Route>

      <Route path="*" element={<Notfound/>}></Route>
    </Routes>
  )
}

export default App