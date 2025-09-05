'use client'

import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import queryString from 'query-string'
import React from 'react'

const Pagination = ({currentPage, hasMore, isUserProfile}: {currentPage: number, hasMore: boolean, isUserProfile?:boolean}) => {
    const searchParams = useSearchParams()
    const params = useParams()
    const currentQuerry = queryString.parse(searchParams.toString())


    const searchParamsUrl = queryString.stringifyUrl({url: '', query: currentQuerry})

    // this will only show when we are at our user profile
    if(isUserProfile){
        return (
    <div className='flex justify-between mt-4'>
        {currentPage > 1 && <Link href={`/user/${params.id}/${currentPage -1}`}>
            <span>Previous</span>
        </Link>}

        {hasMore && <Link href={`/user/${params.id}/${currentPage + 1}`}>
            <span>Next</span>
        </Link>}
    </div>
    )

    }

  return (
    <div className='flex justify-between mt-4'>

        {/* {<Link href={`/blog/feed/${currentPage -1}${searchParamsUrl}`}>
                <span>Previouse</span>
            </Link>}

            { 
            <Link href={`/blog/feed/${currentPage + 1}${searchParamsUrl}`}>
                <span>Next</span>
            </Link>} */}
        {currentPage > 1 && <Link href={`/blog/feed/${currentPage -1}${searchParamsUrl}`}>
            <span>Previous</span>
        </Link>}

        {hasMore && <Link href={`/blog/feed/${currentPage + 1}${searchParamsUrl}`}>
            <span>Next</span>
        </Link>}
    </div>
  )
}

export default Pagination