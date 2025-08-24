'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback } from 'react'
import queryString from 'query-string'
import { cn } from '@/lib/utils'

//updating search params quesrystring
interface TagsProps {
    children: React.ReactNode
    selected?: boolean
}

const Tags = ({children, selected}: TagsProps) => {
  const router = useRouter()
  const params = useSearchParams()

  const handleClick = useCallback(() => {
    if(children === 'All'){
      router.push('/blog/feed/1')
    }else {
      let currentQuerry ={}

      if(params){
        currentQuerry = queryString.parse(params.toString())
      }

      const updatedQuery: any = {
        ...currentQuerry,
        tag:children
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
    }

  }, [children, params, router])


  return (
    <span onClick={handleClick} className={cn("bg-secondary-foreground px-2 py-1 rounded text-sm cursor-pointer",
      selected && "bg-primary text-secondary")}>
      {children}</span>
  )
}

export default Tags