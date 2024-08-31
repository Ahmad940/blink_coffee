'use client'

import CreateBlinkForm from '@/components/core/profile/CreateBlinkForm'
import { ProfileCard } from '@/components/core/profile/ProfileCard'
import { Create } from '@/components/Create'
import { Footer } from '@/components/Footer'
import { EveryOne } from '@/components/ForEveryone'
import { Hero } from '@/components/Hero'
import { NavigationBar } from '@/components/NavBar'
import { useAuth } from '@/contexts/AuthContext'




const ProfileView = () => {
  const { user } = useAuth()
  return (
    <main className='flex flex-col items-center justify-between bg-black'>
      <div className='mb-[80px] w-[100%] items-center justify-center flex flex-col'>
        <NavigationBar />
        <ProfileCard />
      </div>
    </main>
  )
}

export default ProfileView
