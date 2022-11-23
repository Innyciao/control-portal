import React, { useState } from 'react';
import SVG from "react-inlinesvg/esm";
import NewChangeModal from './modals/NewChangeModal';

const NewChange = () => {
  const [next, setNext] = useState(false);
  return (
    <div >
      <div className='flex justify-center mt-8'>
        <SVG
          src={`/media/svg/new-change.svg`}
          className={`inline-block rounded-full w-80 h-80 `}
        />
      </div>
      <div className=' mx-56 mt-7'>
        <p className=' text-center text-sm text-dark-1'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pulvinar magna etiam eget ultricies commodo odio. Ut leo commodo mi semper morbi. Fringilla tempus ut pellentesque nunc molestie.
          At pretium tempus urna nulla tortor sed faucibus volutpat nunc. Ultrices odio aliquet neque ultricies quis.
          Mattis enim gravida mi netus. Nunc duis aliquet tempor aliquet pellentesque auctor ut. Vitae donec consequat ut elementum dignissim turpis. Facilisis tempus in et mattis vitae amet faucibus arcu ultrices.
          Nullam faucibus iaculis tristique quisque.
        </p>
      </div>
      <div className=' flex justify-center'>
        <button onClick={_ => setNext(true)} className='mb-3 bg-primary text-sm rounded-full mt-10 px-4 py-1'>Click Here</button>
      </div>
      <NewChangeModal
        key={`NewChangeModal-${next}`}
        show={next}
        toggle={_ => setNext(!next)}
      />
    </div>
  )
}

export default NewChange;
