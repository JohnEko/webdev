'use client'

import { Search } from 'lucide-react'
import React, { ChangeEventHandler, useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { useRouter, useSearchParams } from 'next/navigation'
import queryString from 'query-string'



const SearchIputs = () => {
    const router = useRouter()
    const [value, setValue] = useState('')
    const params = useSearchParams()

    useEffect(() => {
      let currentQuerry ={}
      
            if(params){
              currentQuerry = queryString.parse(params.toString())
            }
      
            const updatedQuery: any = {
              ...currentQuerry,
              title: value
            }
      
            const url = queryString.stringifyUrl(
              {
                url: '/blog/feed/1',
                query: updatedQuery
              },
              {
                skipNull: true,
                skipEmptyString: true
              }
            )
      
            router.push(url)

    }, [value])

    const handleOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      setValue(e.target.value)
    } 

  return (
    <div className='relative hidden sm:block'>
        <Search className='absolute top-3 left-4 h-4 w-4 text-muted-foreground'/>
        <Input value={value} onChange={handleOnChange} placeholder='Search' className='pl-10 bg-primary/10'/>
    </div>
  )
}

export default SearchIputs