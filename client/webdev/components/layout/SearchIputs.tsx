'use client'

import { Search } from 'lucide-react'
import React, { ChangeEventHandler, useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import queryString from 'query-string'
import { useDebounceValue } from '@/hooks/useDebournceValue'



const SearchIputs = () => {
    const router = useRouter()
    const params = useSearchParams()
    const title = params.get('title')
    const [value, setValue] = useState(title || '')

    const pathName = usePathname()
    const debounceValue = useDebounceValue<string>(value)
    

    useEffect(() => {
      let currentQuerry ={}
      
            if(params){
              currentQuerry = queryString.parse(params.toString())
            }
      
            const updatedQuery: any = {
              ...currentQuerry,
              title: debounceValue
            }
      
            const url = queryString.stringifyUrl(
              {
                url: window.location.href,
                query: updatedQuery
              },
              {
                skipNull: true,
                skipEmptyString: true
              }
            )
      
            router.push(url)

    }, [debounceValue])

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