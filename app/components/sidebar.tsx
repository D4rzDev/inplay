import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Link from "next/link";
import { categories, settings } from "../utils/constant";
import { IconType } from "react-icons";
import { SetStateAction, useState } from "react";

const links = [
        {name:'Gaming', href: '/',},
        {name:'Dota', href: '/',},
        {name:'Fortnite', href: '/',},
        {name:'Mobile Legends', href: '/',},
        {name:'Pubg', href: '/',},
    ]

function renderIcon(icon: IconType) {
  const IconComponent = icon; // Rename the prop to avoid naming conflicts
  return <IconComponent size={20} />;
}


interface SidebarProps {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}


export default function Sidebar ({setSelectedCategory, selectedCategory}:SidebarProps) {
    
    const handleCategoryClick = (category: SetStateAction<string>) => {
    setSelectedCategory(category);
  };

  console.log(selectedCategory);

    return(
        <div className="mb-4">
            <div className=" md:hidden lg:hidden">
                <Carousel className="max-w-screen">
                    <CarouselContent className="-ml-1">
                    {categories.map(( link, id) => (
                        <CarouselItem onClick={() => handleCategoryClick(link.name)} key={id} className="pl-1 basis-1/3">
                        <div className={`flex items-center justify-center p-1 text-xs border-2 rounded-full ${selectedCategory === link.name ? ' bg-[#e473ff]' : ''}`}>
                            <Link href={link.href}>{link.name}</Link>
                        </div>
                        </CarouselItem>
                    ))}
                    </CarouselContent>
                </Carousel>
            </div>

            <div className=" hidden md:flex flex-col w-40 overflow-auto">
                <div className=" h-screen flex flex-col justify-between">
                    <div className=" flex flex-col gap-4">
                        { categories.map((category, id) => (
                            <div key={id} onClick={() => handleCategoryClick(category.name)} className=" flex items-center gap-2 px-4 py-2 text-xs rounded-sm hover:bg-[#1c1d1f]">
                                {renderIcon(category.icon)}
                                <p>{category.name}</p>
                            </div>
                        ))}
                    </div>
               
                    <div className=" border-t-2">
                         { settings.map (( setting, id) => (
                            <div key={id} className=" flex items-center gap-2 px-4 py-2 text-xs rounded-sm hover:bg-[#1c1d1f]">
                                {renderIcon(setting.icon)}
                                <p>{setting.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}