'use client'
import { WalletMultiButton } from '@/components/dynamic/WalletAdapters'
import { useAuth } from '@/contexts/AuthContext'
import { Edit, LogOut, User } from 'lucide-react'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export const NavigationBar = () => {
  const { user } = useAuth()

  return (
    <div className='w-[100%] px-6 z-10 mt-4 bg-slate-300/ mb-[200px] fixed inset-x-0 top-2 flex justify-center items-center'>
      <div className='w-[90%] bg-white/20 backdrop-blur-lg bg-clip-padding bg-opacity-60 md:w-880 bg-navBar p-2.5 rounded-lg flex items-center'>
        <div className='ml-4 mr-auto'>
          <p className='text-4xl'>😉</p>
        </div>
        {user && (
          <div className='ml-auto flex mr-2'>
            <WalletMultiButton />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className='w-12 h-12 ml-3 mr-0 rounded-full bg-black/25'>
                  <img src='./assets/yyy.png' />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-56'>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Link href={'/profile'}>
                    <DropdownMenuItem>
                      <User className='mr-2 h-4 w-4' />
                      <span>Profile</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href={'/edit-profile'}>
                    <DropdownMenuItem>
                      <Edit className='mr-2 h-4 w-4' />
                      <span>Edit Profile</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href={'/profile'}>
                    <DropdownMenuItem>
                      <LogOut className='mr-2 h-4 w-4' />
                      <span>Disconnect</span>
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  )
}
