'use client'

//import { SearchLayout } from '@/components/core/home/SearchBlink'
import CreateBlinkForm from '@/components/core/profile/UpdateUserForm'
import { ProfileCard } from '@/components/core/profile/ProfileCard'
import { Create } from '@/components/Create'
import { Footer } from '@/components/Footer'
import { EveryOne } from '@/components/ForEveryone'
import { Hero } from '@/components/Hero'
import { NavigationBar } from '@/components/NavBar'
import { useAuth } from '@/contexts/AuthContext'
import { useState } from 'react'


import dynamic from 'next/dynamic'


export const SearchLayout = dynamic(
  async () => (await import('@/components/core/home/SearchBlink')).SearchLayout,
  {
    ssr: false,
  }
)


const ProfileView = () => {
  const { user } = useAuth()
  const [search,setSearch] = useState('')
  return (
    <main className='flex flex-col items-center justify-between bg-black'>
      <div className='mb-[80px] w-[100%] items-center justify-center flex flex-col'>
        <NavigationBar />
        <ProfileCard />
        <SearchLayout search={search} />
      </div>
    </main>
  )
}

export default ProfileView
