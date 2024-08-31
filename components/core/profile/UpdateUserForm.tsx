"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { CategoryInterface } from "@/interfaces/models.interface";
import { BlinkService } from "@/lib/services/blink.service";
import { CategoryService } from "@/lib/services/category.service";
import { UserService } from "@/lib/services/user.service";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { Loading } from "notiflix";
import { FormEvent, useEffect, useRef, useState, HTMLInputTypeAttribute } from "react";


interface props {}
interface ImageUploadButtonProps {
  onClick?: () => void; // Make onClick optional since it might not be used
}  

const UpdateUserForm = ({}: ImageUploadButtonProps) => {
  const { user } = useAuth();
  const { publicKey } = useWallet();
  const { toast } = useToast();
  const router = useRouter();
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const handleClick = () => {
    const element = document?.getElementById('image-upload');
    if (element) {
      element.click();
    }
  };
  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const userPk = user?.pub_key
  const titleRef = useRef<HTMLInputElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const imageURLRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const aboutRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const [category, setCategory] = useState("");

  const handleForm = async (e: FormEvent) => {
    e.preventDefault();

    if (!publicKey) return;
    const updateUserDetails = await UserService.updateUser(`${userPk !== null ? userPk : ''}`,{
      //title: titleRef.current?.value || '',
      user_name: userNameRef.current?.value || '',
      profile_img: URL.createObjectURL(selectedImage) ,
      email: emailRef.current?.value || '',
      first_name: firstNameRef.current?.value || '',
      last_name: lastNameRef.current?.value || '',
      about: descriptionRef.current?.value || '',
    });

    if(!updateUserDetails.success)
      return toast({
        title: "Unable to Update user details",
        description: updateUserDetails?.message,
        variant: "destructive",
      });
      toast({
        title: "Update User details successfully",
      });

      console.log('Updated user info',updateUserDetails.data)
   {/** const createBlink = await BlinkService.createBlink({
      title: titleRef.current?.value || "",
      label: titleRef.current?.value || "",
      description: descriptionRef.current?.value || "",
      pub_key: publicKey.toString(),
      user_id: user?.id || "",
      image_url: imageURLRef.current?.value || "",
      category_id: category,
    });

    if (!createBlink.success)
      return toast({
        title: "Unable to create blink",
        description: createBlink?.message,
        variant: "destructive",
      });

    toast({
      title: "Blink created successfully",
    });

    console.log("blink information", createBlink.data);*/} 
  };

  const fetchCategories = async () => {
    //Loading.circle()

    const categories = await CategoryService.getCategories();
    if (!categories.success)
      return toast({
        title: "Unable to fetch categories",
        description: categories?.message,
        variant: "destructive",
        action: <Button onClick={() => router.refresh()}>Refresh</Button>,
      });

    setCategories(categories.data);
    console.log("Categories", categories.data);
    Loading.remove();
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="w-[50%] mt-[50px] mb-[100px]">
      <Card>
        <CardHeader>
          <CardTitle>Personal Info</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleForm}>
            <div className="grid w-full items-center gap-4">
              {/* Title input */}
              <div className="relative mb-2">
                <div
                  className="h-20 w-20 bg-black/40 rounded-full flex justify-center items-center cursor-pointer"
                  onClick={() =>
                   handleClick()
                  }
                >
                 <img src={`${user?.profile_img !== null ? user?.profile_img : './assets/yyy.png'}`} />
                </div>
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={handleImageChange}
                  hidden
                />
                {selectedImage && (
                  <img
                    className="absolute top-0 left-0 h-20 w-20 object-cover rounded-full"
                    src={URL.createObjectURL(selectedImage)}
                    alt="Uploaded Image"
                  />
                )}
              </div>

              {/* Title input */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder={`${user?.user_name !== null ? user?.user_name : 'Choose a username'}`}
                  required
                  ref={userNameRef}
                />
              </div>

              {/* Image Url  */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="first_name">First name</Label>
                <Input
                  id="first_name"
                  placeholder={`${user?.first_name !== null ? user?.first_name : 'Enter your first name'}`}
                  required
                  ref={firstNameRef}
                />
              </div>

              {/* Label input */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="last_Name">Last Name</Label>
                <Input
                  id="last_Name"
                  placeholder={`${user?.last_name !== null ? user?.last_name : 'Enter your last name'}`}
                  required
                  ref={lastNameRef}
                />
              </div>

               {/* Label input */}
               <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={`${user?.email !== null ? user?.email : 'ahmads@blinkme.fun'}`}
                  required
                  ref={emailRef}
                />
              </div>

              {/* Label input 
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="label">Category</Label>
                <Select onValueChange={(value) => setCategory(value)}>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Select a category" />
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
              */}
              {/* Description input */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">About</Label>
                <Textarea
                  id="description"
                  placeholder="Enter Your Bio"
                  required
                  ref={descriptionRef}
                />
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex justify-between">
          {/* <Button variant='outline'>Cancel</Button> */}
          <Button className="w-[160px]" onClick={handleForm}>Edit Profile</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UpdateUserForm;
