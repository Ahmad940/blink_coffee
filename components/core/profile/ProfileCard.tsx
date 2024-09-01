/* eslint-disable @next/next/no-img-element */
import { toast } from '@/components/ui/use-toast'
import { useAuth } from '@/contexts/AuthContext'
import { UserInterface } from '@/interfaces'
import { UserService } from '@/lib/services/user.service'
import { BlinkService } from '@/lib/services/blink.service'
import { useEffect, useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'

export const ProfileCard = () => {
  const [userLoading, setUserLoading] = useState<Boolean>(false)
  const [userData, setUserData] = useState<UserInterface>()
  const [userPkey,setUserPkey] = useState<any>('')
  const { user } = useAuth()

  const { publicKey }:any = useWallet()
  const hanleGenerateBlink = async () => {
    BlinkService.createBlink({
      user_id: `${user?.user_name}`,
      category_id: `payment`,
      title: `Blink Me `,
      image_url: `${user?.profile_img}`,
      description: `Buy me a Coffee`,
      label: `Blink Me`,
      pub_key: publicKey
    })
    if (!publicKey) return
    const blinkit = await  BlinkService.createBlink({
      user_id: `${user?.id}`,
      category_id: `cm0azdecj000313lytkph9fye`,
      title: `Blink Me `,
      image_url: `${user?.profile_img}`,
      description: `Buy me a Coffee`,
      label: `Blink Me`,
      pub_key: publicKey.toString()
    })

    if (!blinkit.success)
      return toast({
        title: 'Unable to Create Blink',
        description: blinkit?.message,
        variant: 'destructive',
      })
    toast({
      title: 'Blink Created successfully',
    })

    console.log('Create Blink info', blinkit.data)
    
  }
  const fetchUser = async () => {
    
    setUserLoading(true)
    const { message, success, data } = await UserService.getUser(
      publicKey
    )
    if (!success)
      return toast({
        title: 'Error while fetching blink',
        variant: 'destructive',
        description: message,
      })
    console.log('data', data)
    setUserData(data)
  }
  useEffect(() => {
    fetchUser()
  }, [])
  return (
    <div className='mt-[200px] w-[100%] flex items-center justify-center flex-col'>
      <div className='w-[65%] bg-[#2C2D30] px-4 py-5 text-white/90 h-[300px] rounded-xl'>
        <div className='flex bg-red-600/0 py-1.5 px-3 h-[100px] ml-auto mr-auto w-[98%]'>
          <div className='ml-3 mr-5'>
            <div className='w-[88px] h-[88px] rounded-full bg-black/60'>
              <img
                src={
                  userData?.profile_img !== null
                    ? userData?.profile_img
                    : './assets/yyy.png'
                }
              />
            </div>
          </div>
          <div className='ml-0 py-3 px-2 mr-auto flex flex-col'>
            <p className='text-[24px] font-bold'>{`Hi, ${
              userData?.first_name !== null ? userData?.first_name : ''
            } ${userData?.last_name !== null ? userData?.last_name : ''}`}</p>
            <p className='text-lg'>{`blinkme.fun/${
              userData?.user_name !== null ? userData?.user_name : ''
            }`}</p>
          </div>
        </div>
        <div className='flex bg-red-600/0 py-2 mt-3 px-3 h-[100px] ml-auto mr-auto w-[98%]'>
          <div className='ml-0 py-3 px-2  mr-auto flex flex-col'>
            <p className='text-[24px] font-bold'>Balance</p>
            <p className='text-[54px] mt-1 font-extrabold'>$0</p>
          </div>
          <div className='w-[200px] ml-auto py-[70px] mr-[60px]'>
            <button onClick={() => hanleGenerateBlink()} className='w-[230px] rounded-md h-10 bg-[#512DA8] text-md'>
              Generate Blink
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
