"use client"
import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa'

const page = () => {
 
  return (
    <div className=' flex flex-col gap-4 p-4'>
      <div className=" bg-zinc-950 sticky top-0 p-4 z-10">
          <Link href={'/'}>
            <FaArrowLeft size={25}/>
          </Link>
      
        </div>
    </div>
  )
}

export default page
