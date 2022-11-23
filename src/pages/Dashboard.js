import axios from 'axios';
import React, { useEffect } from 'react';
import SVG from "react-inlinesvg/esm";
import { NavLink, Outlet } from 'react-router-dom';



const Dashboard = () => {

  // const [role, setRole] =useState('');

  useEffect(() => {
    axios.get('')
  })

  let activeStyle = {
    backgroundColor: "#D9F4C4"
  }
  return (
    <div className=''>
      {/* navbar */}
      <div className=''>
        <div className='flex justify-between p-2 border-b '>
          <NavLink to="/login" className="">
            <img src={`/media/images/logo.png`} alt="" className=" w-6 h-6 " />
          </NavLink>
          <div className=' text-lg font-bold'>CHANGE CONTROL PORTAL</div>
          <div>
            <SVG
              src={`/media/svg/user.svg`}
              className={`inline-block h-6 w-6 `}
            />
          </div>
        </div>
      </div>
      {/* sidebar */}
      <div className=' flex '>

        <div className='border-r w-16 '>
          <div className='flex justify-center items-center flex-col mt-4'>
            <NavLink to="/newchange" style={({ isActive }) => isActive ? activeStyle : undefined}
              className=' w-full text-center rounded-sm p-3'>
              <SVG
                src={`/media/svg/Edit.svg`}
                className={`inline-block stroke-current opacity-75 rounded-full w-6 h-6`}
              />
            </NavLink>

            <NavLink to="/pendingchange" style={({ isActive }) => isActive ? activeStyle : undefined}
              className=' w-full text-center rounded-sm p-3'>
              <SVG
                src={`/media/svg/Clipboard.svg`}
                className={`inline-block stroke-current opacity-75 rounded-full w-6 h-6`}
              />
            </NavLink>
            <NavLink to="/approvechange" style={({ isActive }) => isActive ? activeStyle : undefined}
              className=' w-full text-center rounded-sm p-3'>
              <SVG
                src={`/media/svg/Update.svg`}
                className={`inline-block stroke-current opacity-75 rounded-full w-6 h-6`}
              />
            </NavLink>
            <NavLink to="/declinedchange" style={({ isActive }) => isActive ? activeStyle : undefined}
              className=' w-full text-center rounded-sm p-3'>
              <SVG
                src={`/media/svg/Trash.svg`}
                className={`inline-block stroke-current opacity-75 rounded-full w-6 h-6`}
              />
            </NavLink>
          </div>
        </div>

        <nav className='flex flex-col border-r h-screen py-5 text-center w-2/12'>
          <NavLink className=' text-sm hover:text-primary rounded-sm py-3'
            style={({ isActive }) => isActive ? activeStyle : undefined}
            to="/newchange">
            New Change Request
          </NavLink>
          <NavLink className='mt-1 text-sm hover:text-primary rounded-sm py-3'
            style={({ isActive }) => isActive ? activeStyle : undefined}
            to="/pendingchange">
            Pending Change Request
          </NavLink>
          <NavLink className='mt-1 text-sm hover:text-primary rounded-sm py-3'
            style={({ isActive }) => isActive ? activeStyle : undefined}
            to="/approvechange">
            Approved Change Request
          </NavLink>
          <NavLink className='mt-1 text-sm hover:text-primary rounded-sm py-3'
            style={({ isActive }) => isActive ? activeStyle : undefined}
            to="/declinedchange">
            Declined Change Request
          </NavLink>
          <NavLink
            className='mb-3 text-sm bg-primary rounded-full mt-10'
            to='/login'
          >
            Log Out
          </NavLink>
        </nav>
        <div className=" w-5/6">
          <Outlet />
        </div>
      </div>
    </div>

  )
}

export default Dashboard