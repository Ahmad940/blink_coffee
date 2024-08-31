import { Card } from "../ui/card"
import { SetStateAction } from "react"
import { useRouter } from "next/router"
export const UserCard = ({ setIstrue }) => {

    //const router = useRouter()
    const List = [
        {
            name: 'Profile',
            url: '/profile',
            icon: ''
        },
        {
            name: 'Edit Profile',
            url: '/profile',
            icon: ''
        },
        {
            name: 'Disconnect',
            url: '/profile',
            icon: ''
        },
    ]
    return(
    <div className="inset-0 fixed bg-white/0 bg-opacity-100 w-[100%] z-[99999999] min-h-screen h-auto backdrop-blur-sm flex ">
    <div className="w-[100%] flex px-1 py-20 ">
        <div className="h-[200px] ml-auto mr-0 py-2 px-3 w-[20%] bg-[#2C2D30] shadow-4xl drop-shadow-2xl flex items-center justify-center rounded-xl">
          <div className="w-[99%] h-[99%] p-0 bg-[#512DA8]/0 rounded-xl">
             {
                List && List.map((item,i) => (
                    <>
                    <div onClick={() => {
                        setIstrue(false)
                        window.open(`localhost:3000${item.url}`)
                    }} className="h-10 w-auto hover:bg-[#10141f] text-white/90 cursor-pointer mt-1 mb-1 flex rounded-md p-2">
                        <div>
                            {item.name}
                        </div>
                        <div className="w-8 h-8">
                            <img src={item.icon} />
                        </div>
                    </div>
                    </>
                ))
             }
            <div className="w-[100%] flex items-center justify-center mt-4">
             <button className="bg-black h-8 rounded-xl w-[100px]" onClick={() => setIstrue(false)}>Close</button>
            </div>
          </div>
        </div>
    </div>
    </div>
)
}