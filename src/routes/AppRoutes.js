import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Temples from '../pages/Temples'
import OnlineBooking from '../pages/OnlineBooking'
import Login from '../pages/Login'
import { useSelector } from 'react-redux'
import BookingHistory from '../pages/BookingHistory'
import NotFound from '../pages/NotFound'

const AppRoutes = () => {
  return (
    <Routes>
      <Route exact path='/' element={<Temples />} />
      <Route exact path='/login' element={<Login />} />
      <Route exact path='/onlinebooking' element={<OnlineBooking />} />
      <Route exact path='/history' element={<BookingHistory />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes