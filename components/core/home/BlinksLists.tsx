'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { Search } from './Search'

export const SearchLayout = dynamic(
  async () => (await import('./SearchBlink')).SearchLayout,
  {
    ssr: false,
  }
)

const BlinksLists = () => {
  const [search, setSearch] = useState('')

  return (
    <>
      <p className='mt-[200px] text-[1.5rem] lg:text-[3rem] text-primary-0 font-fredoka leading-[2.25rem] mb-10'>
        {/* Discover blinks for creators and artists */}
        Support for a cause
      </p>
      <Search search={search} setSearch={setSearch} />
      <SearchLayout search={search} />
    </>
  )
}

export default BlinksLists
