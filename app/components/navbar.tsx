"use client"
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FiSearch } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { HiMenuAlt4 } from "react-icons/hi";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { categories } from "../utils/constant";
import { SetStateAction, useRef, useState } from "react";
import { IconType } from "react-icons";

interface NavbarProps {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}

function renderIcon(icon: IconType) {
  const IconComponent = icon;
  return <IconComponent size={25} />;
}

const side = ['top'];


export default function Navbar ({ selectedCategory,setSelectedCategory }:NavbarProps) {

    const top = "top";

    const searchInputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        if (searchInputRef.current) {
        const searchText = searchInputRef.current.value;
        setSelectedCategory(searchText);
        console.log(searchText);
        }
    };
    const handleCategoryClick = (category: SetStateAction<string>) => {
    setSelectedCategory(category);
  };

    return(
        <nav className=" sticky top-0 py-6 px-6 bg-inherit z-10">
            <div className=" flex items-center justify-between">
                <div className=" flex items-center justify-center gap-1">
                    <Image src="/images/IN.svg" alt="logo" width={100} height={100} className=" w-6 h-6" />
                    <h2 className=" text-2xl">.play</h2>
                </div>

                <div className=" flex items-center justify-center gap-4">
                    <div className=" hidden md:flex items-center justify-center gap-2">
                        <Input type="text" placeholder="Search" ref={searchInputRef}/>
                        <Button variant={'primary'} size={'sm'} onClick={handleClick}>
                        <FiSearch size={20}/>
                        </Button>
                    </div>
                    <div className=" flex md:hidden">
                        <Sheet key={top}>
                        <SheetTrigger><Button variant={'primary'} size={'sm'}><FiSearch size={20}/></Button></SheetTrigger>
                        <SheetContent side={top} className="flex flex-col gap-6 w-screen h-[200px]">
                            <SheetHeader>
                                <SheetTitle className=" text-sm font-sans text-zinc-500">Search videos</SheetTitle>
                            </SheetHeader>
                            <div className="flex items-center justify-center gap-2">
                                <Input type="text" placeholder="Search" ref={searchInputRef}/>
                                <Button variant={'primary'} size={'sm'} onClick={handleClick}>
                                <FiSearch size={20}/>
                                </Button>
                            </div>
                        </SheetContent>
                        
                        </Sheet>
                    </div>
                    <div>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>

                    <div className=" md:hidden">
                        <Sheet>
                            <SheetTrigger><HiMenuAlt4 size={25}/></SheetTrigger>
                            <SheetContent className=" w-56 flex flex-col gap-4">
                                <SheetHeader>
                                <SheetTitle>Menu</SheetTitle>
                                </SheetHeader>
                                
                                 <div className=" flex flex-col gap-6 overflow-auto">
                                    { categories.map((category, id) => (
                                        <div key={id} onClick={() => handleCategoryClick(category.name)} className=" flex items-center gap-2 px-4 py-2 rounded-sm hover:bg-[#1c1d1f]">
                                            {renderIcon(category.icon)}
                                            <p className=" text-lg">{category.name}</p>
                                        </div>
                                    ))}
                                </div>
                                <p className=" text-sm font-sans text-zinc-500 text-center mt-10">Develop By: <br />Darel Honrelas</p>    
                            </SheetContent>    
                        </Sheet>
                    </div>
                
                </div>
            </div>
        </nav>
    )
}
