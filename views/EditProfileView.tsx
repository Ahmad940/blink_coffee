'use client'

//import { SearchLayout } from '@/components/core/home/SearchBlink'
import UpdateUserForm from '@/components/core/profile/UpdateUserForm'
import { ProfileCard } from '@/components/core/profile/ProfileCard'
import { Create } from '@/components/Create'
import { Footer } from '@/components/Footer'
import { EveryOne } from '@/components/ForEveryone'
import { Hero } from '@/components/Hero'
import { NavigationBar } from '@/components/NavBar'
import { useAuth } from '@/contexts/AuthContext'
import { useState } from 'react'




const EditProfileView = () => {
  const { user } = useAuth()
  const [search,setSearch] = useState('')
  return (
    <main className='flex flex-col items-center justify-between bg-black'>
      <div className='mb-[80px] w-[100%] items-center justify-center flex flex-col'>
        <NavigationBar />
        <div className='w-[100%] mt-[200px] text-white/90 flex flex-col items-center justify-center h-28 '>
            <div className='w-[50%] mb-4 flex' >
                <p className='text-2xl font-bold'>My Account</p>
            </div>
            <div className='w-[50%] flex' >
                <p>Edit Profile</p>
            </div>
        </div>
        <UpdateUserForm />
    
      </div>
    </main>
  )
}

export default EditProfileView
