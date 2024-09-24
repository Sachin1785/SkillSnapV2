import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from '../Components/Nav'

const MainLayout = () => {
  return (
    <>
        <Nav style={{ position: 'fixed', top: '0px', width: '100%', zIndex: 1000, overflow: 'hidden' }} />
        <Outlet />
    </>
  )
}

export default MainLayout