'use client'
import { WalletMultiButton } from '@/components/dynamic/WalletAdapters'
import { useAuth } from '@/contexts/AuthContext'
import { Edit, LogOut, User, Link2 } from 'lucide-react'
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
    <div className='w-[100%] px-12 z-[9999999] mt-0 mb-[200px] h-20  fixed inset-x-0 top-1 bg-white/0 backdrop-blur-lg bg-clip-padding bg-opacity-60 flex justify-center items-center'>
     
        <div className='ml-4 mr-auto'>
          <Link href={'/'}>
           <p className='text-4xl'>😉</p>
          </Link>
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
              <DropdownMenuContent className='w-56 mr-2 mt-4'>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                <Link href={`/${user.user_name}`}>
                    <DropdownMenuItem>
                      <Link2 className='mr-2 h-4 w-4' />
                      <span>View my page</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href={'/dashboard'}>
                    <DropdownMenuItem>
                      <User className='mr-2 h-4 w-4' />
                      <span>Dashboard</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href={'/edit-profile'}>
                    <DropdownMenuItem>
                      <Edit className='mr-2 h-4 w-4' />
                      <span>Edit Profile</span>
                    </DropdownMenuItem>
                  </Link>
               
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
    </div>
  )
}
