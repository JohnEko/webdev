import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Bell } from 'lucide-react'

const Notifications = () => {
  return (
    <div>
        <DropdownMenu>
            <DropdownMenuTrigger className='relative'>
                <div className='absolute bg-rose-500 h-6 w-6 rounded-full text-sm flext items-center justify-center bottom-2 left-2'>
                    <span>5</span>
                 </div>
                <Bell size={20}/>
               
            </DropdownMenuTrigger>

            <DropdownMenuContent className='w-[100%] max-w-[400px]'>
                <div className='flex gap-4 justify-between mb-2 p-2'>
                    <h3 className='font-bold text-lg'>Notification</h3>
                    <button>Mark all as read</button>
                </div>
                    
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}

export default Notifications