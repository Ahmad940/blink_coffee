import { UserService } from "@/lib/services/user.service"
import { useAuth } from '@/contexts/AuthContext'
import { useEffect, useState } from "react"
import { toast } from "@/components/ui/use-toast"
import { ApiResponse, UserInterface } from "@/interfaces"
export const ProfileCard = () => {
    const [userLoading,setUserLoading] = useState<Boolean>(false)
    const [userData,setUserData] = useState<UserInterface>()
    const { user } = useAuth()
    const privateKey:any = user?.pub_key

    const fetchUser = async () => {
        setUserLoading(true)
        const { message, success, data } = await UserService.getUser(privateKey)
        if (!success)
          return toast({
            title: 'Error while fetching blink',
            variant: 'destructive',
            description: message,
          })
        console.log('data',data)
        setUserData(data)
    }
    useEffect(() => {
       fetchUser() 
    },[])
    return(
    <div className="mt-[200px] w-[100%] flex items-center justify-center flex-col">
      <div className="w-[65%] bg-[#2C2D30] px-4 py-5 text-white/90 h-[300px] rounded-xl">
        <div className="flex bg-red-600/0 py-1.5 px-3 h-[100px] ml-auto mr-auto w-[98%]">
            <div className="ml-3 mr-5">
                <div className="w-[88px] h-[88px] rounded-full bg-black/60">
                  <img src={userData?.profile_img !== null ? userData?.profile_img : './assets/yyy.png'} />
                </div>
            </div>
            <div className="ml-0 py-3 px-2 mr-auto flex flex-col">
                <p className="text-[24px] font-bold">{`Hi, ${userData?.first_name !== null ? userData?.first_name : 'John'} ${userData?.last_name !== null ? userData?.last_name : 'Doe'}`}</p>
                <p className="text-lg">{`blinkme.fun/${userData?.user_name !== null ? userData?.user_name : 'JohnD' }`}</p>
            </div>
            
        </div>
        <div className="flex bg-red-600/0 py-2 mt-3 px-3 h-[100px] ml-auto mr-auto w-[98%]">
           <div className="ml-0 py-3 px-2  mr-auto flex flex-col">
                <p className="text-[24px] font-bold">Balance</p>
                <p className="text-[54px] mt-1 font-extrabold">$0</p>
            </div>
            <div className="w-[200px] ml-auto py-[70px] mr-[60px]">
                <button className="w-[230px] rounded-md h-10 bg-[#512DA8] text-md">
                   Generate Blink
                </button>
            </div>
        </div>
       
      </div>
    </div>
    )
}