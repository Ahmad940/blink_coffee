import {
  Inter,
  Martel,
  Montaga,
  Montserrat,
  Monoton,
  M_PLUS_1,
} from "next/font/google";

export const Create = () => {
  return (
    <div className="w-[90%] ml-auto min-h-screen mr-auto flex mb-[150px]  items-center justify-center flex-col ">
      <div className="w-[75%] rounded-2xl py-0 px-3 border flex flex-col  bg-white/5 border-white/5 h-[600px]">
        <div className=" ml-auto mr-auto bg-black/20 rounded-full flex items-center justify-center w-[140px] h-10 mb-4 mt-20">
          <p className={`text-lg font-light text-white/80 `}>Support </p>
        </div>

        <div className="flex flex-col items-center mt-7 mb-12 justify-center">
          <div className="w-[80%] text-center flex items-center justify-center mt-4">
            <p
              className={`text-6xl  font-bold text-white/80 `}
            >{`Give your audience
an easy way to say thanks.`}</p>
          </div>
          <div className="w-[75%] mt-8 text-center flex items-center justify-center ">
            <p
              className={`text-xl  font-light text-white/80 `}
            >{` Buy Me a Coffee makes supporting fun and easy. In just a couple of taps, your fans can make the payment (buy you a coffee) and leave a message.`}</p>
          </div>
        </div>
        <div className="w-[90%] ml-auto mr-auto mt-5 flex items-center justify-center">
            <div>
                <img src="./assets/image.avif" className="rounded-xl" />
            </div>
        </div>
      </div>
    </div>
  );
};
