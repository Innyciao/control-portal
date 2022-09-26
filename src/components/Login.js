import React from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate();


  const submit = e => {
    e.preventDefault();
    e.stopPropagation();

    navigate("/dashboard")

  }

  return (
    <div className="flex min-h-screen">
      <div className='w-2/5 relative'>
        <img src={`/media/images/bg-1.jpg`} alt="" className="absolute min-h-screen" />
        <div className='flex flex-col justify-between absolute p-6'>
          <img src={`/media/images/trove-logo.png`} alt="" className=" w-28 h-12 " />
          <div className=' ml-28 text-2xl justify-center mt-60 md:ml-12 text-white font-bold text-center'>CONTROL PORTAL</div>
        </div>
      </div>
      <div className='w-3/5'>

        <form onSubmit={submit}>
          <div className=' mt-48'>
            <div className=' text-center'>
              <div className=' font-bold text-lg'>LOGIN ACCOUNT</div>
              <div className=' text-xs mt-1 text-dark-1'>Enter your email and password</div>
            </div>
            <div className='flex justify-center'>
              <input
                placeholder='email address'
                type='email'
                className=' border-2 rounded-full text-sm py-1 w-2/5 px-3 mt-9 text-center bg-slate-50'
              />
            </div>
            <div className='flex justify-center'>
              <input
                placeholder='password'
                type='password'
                className=' border-2 rounded-full text-sm py-1 w-2/5 px-3 mt-5 text-center bg-slate-50'
              />
            </div>
            <div className='flex justify-end mr-56 mt-10'>
              <button
                type="submit"
                className=" bg-primary-light rounded-full text-sm px-4 py-2"
              >
                Sign In
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
export default Login; 