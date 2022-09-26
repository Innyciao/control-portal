import React from 'react';
import SVG from "react-inlinesvg/esm";
import { NavLink, Outlet } from 'react-router-dom';



const Dashboard = () => {
  return (
    <div>
      {/* navbar */}
      <div>
        <div className='flex justify-between p-2 border-b'>
          <div className="">
            <img src={`/media/images/logo.png`} alt="" className=" w-6 h-6 " />
          </div>
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
        <nav className='flex flex-col px-5 border-r h-screen py-5 text-center w-2/12'>
          <NavLink className='mb-3 text-sm hover:text-primary' to="/newchange">New Change Request</NavLink>
          <NavLink className='mb-3 text-sm hover:text-primary' to="/approvechange">Approve Change Request</NavLink>
          <NavLink className='mb-3 text-sm hover:text-primary' to="/pendingchange">Pending Change Request</NavLink>
          <NavLink className='mb-3 text-sm hover:text-primary' to="/rejectedchange">Rejected Change Request</NavLink>
          <NavLink className='mb-3 text-sm bg-primary rounded-full mt-10'>Log Out</NavLink>
        </nav>
        <div className=" w-5/6">
          <Outlet/>
        </div>
      </div>
    </div>

  )
}

export default Dashboard