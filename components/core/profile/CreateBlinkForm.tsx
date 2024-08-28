'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/contexts/AuthContext'
import { CategoryInterface } from '@/interfaces/models.interface'
import { BlinkService } from '@/lib/services/blink.service'
import { CategoryService } from '@/lib/services/category.service'
import { useWallet } from '@solana/wallet-adapter-react'
import { useRouter } from 'next/navigation'
import { Loading } from 'notiflix'
import { FormEvent, useEffect, useRef, useState } from 'react'

interface props {}

const CreateBlinkForm = ({}: props) => {
  const { user } = useAuth()
  const { publicKey } = useWallet()
  const { toast } = useToast()
  const router = useRouter()

  const [categories, setCategories] = useState<CategoryInterface[]>([])

  const titleRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)
  const imageURLRef = useRef<HTMLInputElement>(null)
  const labeRef = useRef<HTMLInputElement>(null)
  const [category, setCategory] = useState('')

  const handleForm = async (e: FormEvent) => {
    e.preventDefault()

    if (!publicKey) return

    const createBlink = await BlinkService.createBlink({
      title: titleRef.current?.value || '',
      label: titleRef.current?.value || '',
      description: descriptionRef.current?.value || '',
      pub_key: publicKey.toString(),
      user_id: user?.id || '',
      image_url: imageURLRef.current?.value || '',
      category_id: category,
    })

    if (!createBlink.success)
      return toast({
        title: 'Unable to create blink',
        description: createBlink?.message,
        variant: 'destructive',
      })

    toast({
      title: 'Blink created successfully',
    })

    console.log('blink information', createBlink.data)
  }

  const fetchCategories = async () => {
    Loading.circle()

    const categories = await CategoryService.getCategories()
    if (!categories.success)
      return toast({
        title: 'Unable to fetch categories',
        description: categories?.message,
        variant: 'destructive',
        action: <Button onClick={() => router.refresh()}>Refresh</Button>,
      })

    setCategories(categories.data)
    console.log('Categories', categories.data)
    Loading.remove()
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <div className='w-96'>
      <Card>
        <CardHeader>
          <CardTitle>Create blink</CardTitle>
          <CardDescription>put in your blink information</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleForm}>
            <div className='grid w-full items-center gap-4'>
              {/* Title input */}
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='title'>Title</Label>
                <Input
                  id='title'
                  placeholder='Title of your blink'
                  required
                  ref={titleRef}
                />
              </div>

              {/* Image Url  */}
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='image_url'>Image Url</Label>
                <Input
                  id='image_url'
                  placeholder='Enter image url'
                  required
                  ref={imageURLRef}
                />
              </div>

              {/* Label input */}
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='label'>Label</Label>
                <Input
                  id='label'
                  placeholder='label of your blink'
                  required
                  ref={labeRef}
                />
              </div>

              {/* Label input */}
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='label'>Category</Label>
                <Select onValueChange={(value) => setCategory(value)}>
                  <SelectTrigger className=''>
                    <SelectValue placeholder='Select a category' />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((item) => (
                      <SelectItem key={item?.id} value={item?.id}>
                        {item?.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Description input */}
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='description'>Description</Label>
                <Textarea
                  id='description'
                  placeholder='description of your blink'
                  required
                  ref={descriptionRef}
                />
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter className='flex justify-between'>
          {/* <Button variant='outline'>Cancel</Button> */}
          <Button onClick={handleForm}>Create</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default CreateBlinkForm
