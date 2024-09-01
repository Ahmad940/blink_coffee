import { UserService } from "@/lib/services/user.service"
import { useAuth } from '@/contexts/AuthContext'
import { useEffect, useState } from "react"
import { toast } from "@/components/ui/use-toast"
import { ApiResponse, UserInterface } from "@/interfaces"
import { Item } from "@radix-ui/react-dropdown-menu"
export const UserDetails = ({slug}:any) => {
    const [userLoading,setUserLoading] = useState<Boolean>(false)
    const [userData,setUserData] = useState<UserInterface>()
    const { user } = useAuth()
    const [PKey,setPkey] = useState<any>(null);

    const fetchUser = async () => {
        setPkey(user?.pub_key)
        setUserLoading(true)
        const { message, success, data } = await UserService.getUserByName(slug)
        if (!success)
          return toast({
            title: 'Error while fetching blink',
            variant: 'destructive',
            description: message,
          })
        console.log('data',data)
        setUserData(data)
    }
    const socials = [
      {
        name: 'X',
        url: './assets/x.png',
      },
      {
        name: 'TG',
        url: './assets/tg.svg',
      },
    ]
    useEffect(() => {
       fetchUser() 
    },[])
    return(
    <div className="mt-[200px] w-[100%] flex ml-auto mr-auto px-8 items-center justify-center ">
      <div className="w-[65%] bg-[#2C2D30] px-4 py-4 text-white/90 h-[320px] rounded-xl">
        <div className="flex flex-col bg-red-600/0 py-1 px-1 h-[100px] ml-auto mr-auto w-[98%]">
            
        <div className="ml-3 mr-5">
                <div className="w-[48px] h-[48px] rounded-full bg-black/60">
                  <img src={userData?.profile_img !== null ? userData?.profile_img : './assets/yyy.png'} />
                </div>
            </div>
            <div className="ml-0 py-3 px-2 mr-auto flex flex-col">
                <p className="text-[20px] font-bold">{`About ${userData?.first_name !== null ? userData?.first_name : 'John'} ${userData?.last_name !== null ? userData?.last_name : 'Doe'}`}</p>
                <p className=" mt-3 mb-9 text-[16px]">{`${userData?.about !== null ? userData?.about : 'No about' }`}</p>
            </div>
        </div>
        <div className="ml-3 mt-[90px] mr-5">
        <p className="text-[18px]  mt-3 ml-3 mb-4 font-bold">{`Social Links`}</p>
                <div className=" rounded-full px-5 flex bg-black/0">
                  {
                   userData?.email !== 'undefined' ?
                    <>
                   <div className="w-10 h-10 bg-white/40 px-0 py-0 rounded-full ml-1.5 mr-1.5">
                     <img src={'./assets/yyy.png'} className="w-10 h-10 rounded-e-full" />
                   </div>
                   </> 
                   : 
                   <></>
                  }
                   {
                   userData?.email !== 'undefined' ?
                    <>
                   <div className="w-10 h-10 bg-white/40 px-0 py-0 rounded-full ml-1.5 mr-1.5">
                     <img src={'./assets/yyy.png'} className="w-10 h-10 rounded-e-full" />
                   </div>
                   </> 
                   : 
                   <></>
                  }
                   {
                   userData?.email !== 'undefined' ?
                    <>
                   <div className="w-10 h-10 bg-white/40 px-0 py-0 rounded-full ml-1.5 mr-1.5">
                     <img src={'./assets/yyy.png'} className="w-10 h-10 rounded-e-full" />
                   </div>
                   </> 
                   : 
                   <></>
                  }
                </div>
        </div>
       
       
      </div>
    </div>
    )
}