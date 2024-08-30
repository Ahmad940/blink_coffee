'use client'

import { Create } from '@/components/Create'
import { Footer } from '@/components/Footer'
import { EveryOne } from '@/components/ForEveryone'
import { Hero } from '@/components/Hero'
import { NavigationBar } from '@/components/NavBar'
import { useAuth } from '@/contexts/AuthContext'
import dynamic from 'next/dynamic'

export const BlinksLists = dynamic(
  async () => await import('@/components/core/home/BlinksLists'),
  {
    ssr: false,
  }
)

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
