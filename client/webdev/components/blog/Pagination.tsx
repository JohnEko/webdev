'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import queryString from 'query-string'
import React from 'react'

const Pagination = ({currentPage, hasMore}: {currentPage: number, hasMore: boolean}) => {
    const params = useSearchParams()
    const currentQuerry = queryString.parse(params.toString())

    const searchParams = queryString.stringifyUrl({url: '', query: currentQuerry})

  return (
    <div className='flex justify-between mt-4'>

        {<Link href={`/blog/feed/${currentPage -1}`}>
                <span>Previouse</span>
            </Link>}

            { 
            <Link href={`/blog/feed/${currentPage + 1}`}>
                <span>Next</span>
            </Link>}
        {/* {currentPage > 1 && <Link href={`/blog/feed/${currentPage -1}${searchParams}`}>
            <span>Previous</span>
        </Link>}

        {hasMore && <Link href={`/blog/feed/${currentPage + 1}${searchParams}`}>
            <span>Next</span>
        </Link>} */}
    </div>
  )
}

export default Pagination