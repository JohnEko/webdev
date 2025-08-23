import React from 'react'
import { PiHandsClapping } from 'react-icons/pi'
import { FaRegBookmark, FaRegComment } from 'react-icons/fa'


const Reactions = () => {
  return (
    <div className='flex justify-between items-center w-full text-sm'>
        <div className='flex items-center gap-4'>
            {/* different icons to be used  */}
            <span className='mr-4 flex items-center gap-1 cursor-pointer4'>
                <PiHandsClapping  size={20}/>
                {7}
            </span>
            <span className='flex items-center gap-1 cursor-pointer4'>
                <FaRegComment  size={18}/>
                {3}
            </span>
        </div>
        {/* for the bookmart sections */}
        <div>
            <span>
                <FaRegBookmark  size={18}/>
            </span>
        </div>
    </div>
    
  )
}

export default Reactions