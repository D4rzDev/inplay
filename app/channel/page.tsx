"use client"
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { IoIosCheckmarkCircle } from 'react-icons/io'
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { FaArrowLeft } from 'react-icons/fa'

const page = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get('search');

 
  return (
    <div className=' flex flex-col gap-4 p-4'>
      <div className=" bg-zinc-950 sticky top-0 p-4 z-10">
          <Link href={'/'}>
            <FaArrowLeft size={25}/>
          </Link>
        <p>{search}</p>
        </div>
    </div>
  )
}

export default page
