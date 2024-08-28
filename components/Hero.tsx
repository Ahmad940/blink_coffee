import { Inter, Martel, Montaga, Montserrat, Monoton , M_PLUS_1 } from 'next/font/google'


const inter = Montserrat({ subsets: ['latin'] })


export const Hero = () => {
    return(
        <div className="w-[90%] ml-auto min-h-screen mr-auto flex mt-14 items-center justify-center flex-col ">
            <div className="w-[65%] rounded-2xl py-2 px-3 border flex items-center justify-center border-white/5 h-[300px]">
               <div className="flex flex-col items-center justify-center">
                 <p className={`text-8xl font-bold text-white/80 font-${inter.className} `}>Blink Me 😉</p>
                 <div className='w-[70%] text-center flex items-center justify-center mt-10'>
                  <p className={`text-xl  font-extralight text-white/80 `}>Accept support. Start a membership. Setup a shop. It’s easier than you think.</p>
                 </div>
               </div>
            </div>
        </div>
    )
}
