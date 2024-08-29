export const Footer = () => {
    const socials = [
        {
            name: 'X',
            url: './assets/x.png'
        },
        {
            name: 'TG',
            url: './assets/tg.svg'
        },
    ]
    return(
    <div className="w-[100%]">
       <div className="flex">
        <div className="flex items-center text-[18px] text-white/70 justify-center">
          <p>© Blink Me</p>
        </div>
        <div className="flex ml-auto">
           {
            socials && socials.map((item,i) => (
                <>
                <div key={i} className="w-8 ml-2 mr-2 h-8">
                    <img src={item.url} />
                </div>
                </>
            ))
           }
        </div>
       </div>
    </div>
)
}