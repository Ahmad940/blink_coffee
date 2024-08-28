'use client'

import { Create } from '@/components/Create'
import { Hero } from '@/components/Hero'
import { NavigationBar } from '@/components/NavBar'
import { SearchLayout } from '@/components/SearchBlink'

const HomeView = () => {
  return (
    <main className='flex flex-col items-center justify-between p-4 bg-black'>
      <div className='mb-[80px]'>
        <NavigationBar />
      </div>
      <Hero />
      <Create />
      <SearchLayout />
    </main>
  )
}

export default HomeView
