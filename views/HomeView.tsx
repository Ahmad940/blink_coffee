'use client'

import BlinksLists from '@/components/core/home/BlicksLists'
import { Create } from '@/components/Create'
import { Footer } from '@/components/Footer'
import { EveryOne } from '@/components/ForEveryone'
import { Hero } from '@/components/Hero'
import { NavigationBar } from '@/components/NavBar'
import { useAuth } from '@/contexts/AuthContext'

const HomeView = () => {
  const { user } = useAuth()
  return (
    <main className='flex flex-col items-center justify-between bg-black'>
      <div className='mb-[80px]'>
        <NavigationBar />
      </div>
      {user ? (
        <BlinksLists />
      ) : (
        <>
          <Hero />
          <Create />
          <EveryOne />
          <Footer />
        </>
      )}
    </main>
  )
}

export default HomeView
