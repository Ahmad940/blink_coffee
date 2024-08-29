'use client'

import { Create } from '@/components/Create'
import { Footer } from '@/components/Footer'
import { EveryOne } from '@/components/ForEveryone'
import { Hero } from '@/components/Hero'
import { NavigationBar } from '@/components/NavBar'
import { Search } from '@/components/Search'
import { SearchLayout } from '@/components/SearchBlink'
import { useAuth } from '@/contexts/AuthContext'

const HomeView = () => {
  const { user } = useAuth()
  return (
    <main className='flex flex-col items-center justify-between p-4 bg-black'>
      <div className='mb-[80px]'>
        <NavigationBar />
      </div>
      {
        user ? 
         <>
          <Search />
          <SearchLayout />
         </> 
        :
         <>
          <Hero />
          <Create />
          <EveryOne />
          <Footer />
         </>
      }
    </main>
  )
}

export default HomeView
