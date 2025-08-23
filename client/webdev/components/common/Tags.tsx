import React from 'react'

interface TagsProps {
    children: React.ReactNode
}

const Tags = ({children}: TagsProps) => {
  return (
    <span className='bg-secondary-foreground px-2 py-1 rounded text-sm cursor-pointer'>{children}</span>
  )
}

export default Tags