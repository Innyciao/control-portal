import React from 'react';
import SVG from "react-inlinesvg/esm";

const SubmitDecline = ({cancel}) => {
  return (
    <div>
        <div className='flex justify-center mt-8'>
        <SVG
          src={`/media/svg/Decline.svg`}
          className={`inline-block rounded-full w-30 h-30 `}
        />
      </div>
      <div className='text-center mt-10'>Request Declined Succesfully</div>
      <div className=' flex justify-center'>
        <button
          onClick={cancel}
          className='mb-3 bg-primary rounded-full mt-10 px-4 py-1 text-white text-sm'>OK</button>

      </div>
    </div>
  )
}

export default SubmitDecline