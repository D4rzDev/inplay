"use client"
import axios from "axios"
import { useEffect, useState } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link";
import Image from "next/image";

interface VideoItem {
    id:{
        videoId: string;
    }
    snippet: {
        title: string;
        channelTitle: string;
        channelId: string;
        thumbnails: {
            high: {
                url: string;
            };
        };
    };
}

interface fetchDataProps {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}


export default function FetchData({ setSelectedCategory, selectedCategory}:fetchDataProps) {

    const [videos, setVideos] = useState<VideoItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
  
    console.log('Selected Category:', selectedCategory);

   const fetchVideos = async () => {
    setIsLoading(true); // Set loading state before fetching
    try {
      const response = await axios.get('https://youtube-v3-lite.p.rapidapi.com/search', {
        method: 'GET',
        params: {
          maxResults: '20',
          part: 'id,snippet',
          type: 'video',
          q: selectedCategory,
        },
        headers: {
          'X-RapidAPI-Key': 'cd936098damshc833db44e93774ep1f5c4fjsne8380714294f', // Replace with your actual API key
          'X-RapidAPI-Host': 'youtube-v3-lite.p.rapidapi.com',
        },
      });

      console.log(response.data.items);
      setVideos(response.data.items);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false); // Set loading state after fetch, even on errors
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [selectedCategory])

    return(
        <div className=" h-screen overflow-y-auto w-full">
            <div className=" flex items-center gap-2 text-xl mb-4">
                <h1 className=" text-[#e473ff]">{selectedCategory}</h1>
                <h1 >videos</h1>
            </div>
              { isLoading ? (

                <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:grid-cols-4">
                     {[...Array(50)].map((_, index) => (
                        <div key={index} className=" flex flex-col gap-2" >
                            <Skeleton className="h-[180px] w-full rounded-lg" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[220px]" />
                                <Skeleton className="h-4 w-[180px]" />
                            </div>
                        </div>
                    ))}
                </div>
                
            )
                
              : (

                <div className=" grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    { videos.map ((video, idx) =>(
                    <div key={idx} className=" flex flex-col gap-2"  >
                        <Link href={`/${video.id.videoId}?search=${video.id.videoId}`} passHref> 
                            <Image src={video.snippet.thumbnails.high.url} alt="" width={500}  height={500} className=" w-screen h-[180px] md:h-[180px] lg:h-[150px] " />
                            <p className="line-clamp-2 mt-2">{video.snippet.title}...</p>
                        </Link>
                        <Link href={`/channel/?search=${video.snippet.channelId}`} passHref>
                            <div className=" flex items-center gap-1 ">
                                <p className=" font-sans text-sm text-gray-400 ">{video.snippet.channelTitle}</p>
                                <IoIosCheckmarkCircle className=" text-[#e473ff]"/>
                            </div>

                        </Link>
                        </div>
                    ))}
                </div>
           
            )}


        </div>
    )

}