'use client'
import { WalletMultiButton } from '@/components/dynamic/WalletAdapters'
import { useAuth } from '@/contexts/AuthContext'
import { UserCard } from './modals/UserCard'
import { useState } from 'react'

export const NavigationBar = () => {
  const [istrue,setIstrue] = useState<Boolean>(false)
  const { user } = useAuth()
    return(
        <div className="w-[100%] px-6 z-[999] mt-4 bg-slate-300/ mb-[200px] fixed inset-x-0 top-2 flex justify-center items-center">
            <div className="w-[90%] bg-white/20 backdrop-blur-lg bg-clip-padding bg-opacity-60 md:w-880 bg-navBar p-2.5 rounded-lg flex items-center">
                <div className='ml-4 mr-auto'>
                   <p className='text-4xl'>😉</p>
                </div>
                {
                    user && 
                    <div className='ml-auto flex mr-2'>
                    <WalletMultiButton />
                   
                        <div onClick={() => setIstrue(!istrue)} className='w-12 h-12 ml-3 mr-0 rounded-full bg-black/25'>
                           <img src='./assets/yyy.png' />
                        </div>
                        {
                            istrue && <UserCard setIstrue={setIstrue}/>
                        }
                </div>
                }
                
            </div>
        </div>
    )
}