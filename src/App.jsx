import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import Profile from './Pages/Profile'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import CreateListing from './Pages/CreateListing'
import UpdateListing from './Pages/UpdateListing'
import Listing from './Pages/Listing'
import Search from './Pages/Search'
import Footer from './components/Footer'
import Hotels from './Pages/Hotels'
import Booking from './Pages/Booking'
import BookingsPage from './Pages/BookingsPage'
import Termsconditions from './Pages/Termsconditions'
import Privacypolicy from './Pages/Privacypolicy'

function App() {
  return (
    <BrowserRouter>
    <Header/>
        <Routes>
             <Route path='/' element={<Home/>} />   /*here we created path (route through Routes By using BrowserRouter) fro pages*/
             <Route path='/About' element={<About/>} />
             <Route path='/Sign-In' element={<SignIn/>}/>
             <Route path='/Sign-Up' element={<SignUp/>}/>
             <Route element={<PrivateRoute/>}>
                       <Route path='/Profile' element={<Profile/>}/>
                       <Route path='/create-Listing' element={<CreateListing/>}/>
                       <Route path='/update-Listing/:listingId' element={<UpdateListing/>}/>
                       <Route path='/booking/:listingId' element={<Booking/>} />
                       <Route path='/My/bookings' element={<BookingsPage/>} />
             </Route>
             <Route path='/listing/:listingId' element={<Listing/>}/>
             <Route path='/search' element={<Search/>}/>
             <Route path='/Hotels' element={<Hotels/>}/>
             <Route path='/terms&conditions' element={<Termsconditions/>}/>
             <Route path='/privac&ypolicy' element={<Privacypolicy/>}/>
             
        </Routes>
        <Footer/>
    </BrowserRouter>

  
  )
}

export default App
