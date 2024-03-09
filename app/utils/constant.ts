import Link from "next/link";
import { RiHomeFill } from "react-icons/ri";
import { IoMdMusicalNote } from "react-icons/io";
import { IoGameController } from "react-icons/io5";
import { RiLiveFill } from "react-icons/ri";
import { MdSportsFootball } from "react-icons/md";
import { PiCoatHangerFill } from "react-icons/pi";
import { IoMdSettings } from "react-icons/io";
import { IoIosHelpCircle } from "react-icons/io";
import { MdFeedback } from "react-icons/md";
import { IconType } from "react-icons";

export const categories: { name: string; icon: IconType; href: string;}[] = [
    {name: 'Trending', href:'/',  icon: RiHomeFill, },
    {name: 'Music',href:'/',icon: IoMdMusicalNote,},
    {name: 'Gaming',href:'/',icon: IoGameController,},
    {name: 'Live',href:'/',icon: RiLiveFill,},
    {name: 'Sport',href:'/',icon: MdSportsFootball,},
    {name: 'Fashion',href:'/',icon: PiCoatHangerFill,},
]

export const settings =[
    {name: 'Settings',  icon: IoMdSettings,},
    {name: 'Help',  icon: IoIosHelpCircle,},
    {name: 'Send a feedback',  icon: MdFeedback,},
    
]

export const skeletonLoading = []