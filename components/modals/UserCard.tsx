import { Card } from "../ui/card"
import { SetStateAction } from "react"

export const UserCard = ({setIstrue}) => {
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
        <div className="h-[200px] ml-auto mr-0 py-2 px-3 w-[23%] bg-white/90  flex items-center justify-center border-[#512DA8]/90 border rounded-xl">
          <div className="w-[99%] h-[99%] p-0 bg-[#512DA8]/0 rounded-xl">
             {
                List && List.map((item,i) => (
                    <>
                    <div className="h-10 w-auto bg-black/15 mt-1 mb-1 flex rounded-md p-2">
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

            <button onClick={() => setIstrue(false)}>Close</button>
          </div>
        </div>
    </div>
    </div>
)
}