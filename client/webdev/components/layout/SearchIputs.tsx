import { Search } from 'lucide-react'
import React from 'react'
import { Input } from '../ui/input'

const SearchIputs = () => {
  return (
    <div className='relative hidden sm:block'>
        <Search className='absolute top-3 left-4 h-4 w-4 text-muted-foreground'/>
        <Input placeholder='Search' className='pl-10 bg-primary/10'/>
    </div>
  )
}

export default SearchIputs