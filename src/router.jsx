import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import DonateBook from './pages/DonateBook'
import RequestBook from './pages/RequestBook'
import BookDetails from './pages/BookDetails'
import Login from './pages/Login'
import Signup from './pages/Signup'
import PrivateRoute from './components/PrivateRoute'

const Approuter = () => {
  return (
    


<Routes>
<Route path="/" element = {<Home/>}/>
<Route path="/donate" element = {<PrivateRoute> <DonateBook/></PrivateRoute> }/>
<Route path="/request" element = {<RequestBook/>}/>
<Route path="/book/:id" element = {<BookDetails/>}/>
<Route path="/login" element = {<Login/>}/>
<Route path="/signup" element = {<Signup/>}/>
 <Route path="*" element={<h2>404 - Page Not Found</h2>} />
{/* <Route path="/dashboard" element={<Dashboard />} /> */}
      {/* <Route path="/admin" element={<AdminPanel />} /> */}
</Routes>
)
}

export default Approuter