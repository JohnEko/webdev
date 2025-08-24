'use client'

import React, { useEffect } from 'react'
import Container from './Container'
import ThemeToggle from './ThemeToggle'
import { MdNoteAlt } from 'react-icons/md'
import SearchIputs from './SearchIputs'
import Notifications from './Notifications'
import UserButton from './UserButton'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import Tags  from './Tags'

const Navbar = () => {

  const session = useSession()
  const isLoggedIn = session.status === 'authenticated'
  const path = usePathname()
  const router = useRouter()

  useEffect(() => {
    // updating the user session
    if(!isLoggedIn && path){
      const updateSession = async() => {
        await session.update
      }
      updateSession()
    }
  }, [path, isLoggedIn])

  console.log(session)

  return (
     <nav className="sticky top-0 border-b z-50 bg-white">
      <Container>
     
        <div className="flex justify-between items-center gap-8">
            <div className='flex items-center gap-1 cursor-pointer'>
                <MdNoteAlt size={24}/>
                <div className='font-bold text-xl'><Link href={"/blog/feed/1"}>WebDev</Link></div>
            </div>

            <SearchIputs />

              
            <div className='flex gap-5 sm:gap-8 items-center'>

               <ThemeToggle />
              { isLoggedIn && <Notifications />}
              { isLoggedIn && <UserButton />}    
              { !isLoggedIn && <>
                  <Link href={'/login'}>Login</Link>
                  <Link href={'/register'}>Register</Link>
                </>}  
                
            </div>
        </div>
    
      </Container>
      <Tags />
    </nav>
  )
}

export default Navbar