

import React from 'react'
import Container from './Container'
import ThemeToggle from './ThemeToggle'
import { MdNoteAlt } from 'react-icons/md'
import { Search } from 'lucide-react'
import SearchIputs from './SearchIputs'
import Notifications from './Notifications'
import UserButton from './UserButton'

const Navbar = () => {
  return (
     <nav className="sticky top-0 border-b z-50 bg-white">
      <Container>
     
        <div className="flex justify-between items-center gap-8">
            <div className='flex items-center gap-1 cursor-pointer'>
                <MdNoteAlt size={24}/>
                <div className='font-bold text-xl'>WebDev</div>
            </div>

            <SearchIputs />

              
            <div className='flex gap-5 sm:gap-8 items-center'>
                <ThemeToggle />
                <Notifications />
                <UserButton />
            </div>
        </div>
    
      </Container>
    </nav>
  )
}

export default Navbar