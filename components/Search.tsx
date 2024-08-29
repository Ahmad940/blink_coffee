import { Input } from "./ui/input"
import { Button } from "./ui/button"
export const Search = () => {
    return (
    <div className="w-[100%] mt-[340px] mb-32 items-center justify-center flex">
       <div className="w-[90%] flex items-center justify-center">
         <div className="w-[74%] px-8 h-20 bg-black/15 rounded-xl items-center justify-center flex">
           <div className="w-[80%] mr-auto ml-2">
           <Input size={40} style={{background:'inherit',}} />  
           </div>
           <div className="w-[20%] mr-2 ml-auto">
           <Button size={'default'} type="submit" />      
           </div>
         </div>

       </div>
    </div>
    )
}