import { Inter, Martel, Montaga, Montserrat, Monoton , M_PLUS_1 } from 'next/font/google'
import { WalletMultiButton } from '@/components/dynamic/WalletAdapters'

const inter = Montserrat({ subsets: ['latin'] })


export const Hero = () => {
    return(
        <div className="w-[90%] ml-auto min-h-screen mr-auto flex mt-6 items-center justify-center flex-col ">
            <div className="w-[65%] rounded-2xl py-2 px-3 border flex items-center justify-center border-white/0 h-[300px]">
               <div className="flex flex-col items-center justify-center">
                 <p className={`text-8xl font-bold text-white/80 font-${inter.className} `}>Blink Me 😉</p>
                 <div className='w-[70%] text-center flex items-center justify-center mt-10'>
                  <p className={`text-xl  font-extralight text-white/80 `}>Fuel your crypto innovations with ease. Accept support through Blinks.</p>
                 </div>
                 <div className='w-[50%] h-14 rounded-md flex items-center mt-24 justify-center '> 
                    <WalletMultiButton />
                 </div>
               </div>
            </div>
        </div>
    )
}
