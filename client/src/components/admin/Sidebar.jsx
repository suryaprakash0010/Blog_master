import React from 'react'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom';


const Sidebar = () => {
  return (
    <div>
        <NavLink end={true} to='/admin' className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}`} >
            <img src={assets.home_icon} alt="" className='min-w-4 w-5' />
            <p className='hidden md:inline-block'>Dashboard</p>
        </NavLink>
    </div>
  )
}

export default Sidebar