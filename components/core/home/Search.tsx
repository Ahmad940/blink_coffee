import { Button } from '@/components/ui/button'
import { Input } from '../../ui/input'

interface Props {
  search: String
  setSearch: (search: string) => void
}

// bg - black / 15
export const Search = ({ search, setSearch }: Props) => {
  return (
    <div className='flex items-center px-5 bg-slate-800 w-[80vw] rounded-xl'>
      <Input
        className='bg-inherit md:text-[1rem] py-8 outline-none border-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-slate-400 text-white'
        placeholder='Search for blink'
      />
      <Button>{'Open'}</Button>
    </div>
  )
}
