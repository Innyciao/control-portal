import React, { useState } from 'react';
import axios from 'axios';

const Dropdown = ({guid, requestId}) => {
  const [showOptions, setShowOptions] = useState(false);
  const handleClick = () => {
    setShowOptions(!showOptions)
  }
  

  const approve = (_) => {
    axios.post(`${process.env.REACT_APP_API_HOST}/approve-change`, {
      guid: guid,
      requestId: requestId,
    }).then(res => console.log(res))
      .catch(err => console.log(err));
    console.log()
  }

  const reject = (_) => {
    axios.post(`${process.env.REACT_APP_API_HOST}/decline-change`, {
      guid: guid,
      requestId: requestId,
    }).then(res => console.log(res))
      .catch(err => console.log(err));
    console.log()
  }
  // approve
  // reject


  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={handleClick}
          type="button"
          className="inline-flex w-full justify-center rounded-md border border-gray-300 px-4 py-1 mt-1 bg-white text-xs font-medium text-gray-700 shadow-sm hover:bg-primary-faint focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-100" id="menu-button" aria-expanded="true" aria-haspopup="true">
          Select Options

          <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {showOptions && (
        <div class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
          <div class="py-1" role="none">
            <button
              onClick={approve}
              href="/approvechange"
              className="text-gray-700 block px-4 py-2 text-xs w-full hover:bg-primary-faint"
              role="menuitem"
              tabindex="-1"
              id="approve">
              Approve
            </button>
            <button
            onClick={reject}
              href="/rejectedchange"
              className="text-gray-700 block px-4 py-2 text-xs w-full hover:bg-primary-faint"
              role="menuitem"
              tabindex="-1"
              id="reject">
              Reject
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dropdown