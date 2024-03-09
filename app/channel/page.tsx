"use client"
import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { IoIosCheckmarkCircle } from 'react-icons/io'
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { FaArrowLeft } from 'react-icons/fa'

interface ChannelData {
  statistics:{
    subscriberCount: string;
    videoCount: string;
  }
  snippet:{
    description: string;
    title: string;
    customUrl: string;
    thumbnails:{
      high:{
        url: string;
      }
      medium:{
        url: string;
      }
    }
  };
};

interface ChannelVideos{
   id:{
        videoId: string;
    }
   snippet: {
        title: string;
        channelTitle: string;
        description: string;
        publishedAt: string;
        channelId: string;
        thumbnails: {
            high: {
                url: string;
            };
        };
    };
}

const page = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const [channelData, setChannelData] = useState<ChannelData | null>(null);
  const [channelVideos, setChannelVideos] = useState<ChannelVideos[]>([]);
  const [loading, setLoading] = useState(true);

  //channel
  useEffect (() => {
    const fetchChannel = async () => {
        try {
          const response = await axios.get('https://youtube-v3-lite.p.rapidapi.com/channels', {
            method: 'GET',
            params: {
                id: search,
                part: 'id,snippet,contentDetails,statistics'
            },
             headers: {
                'X-RapidAPI-Key': 'cd936098damshc833db44e93774ep1f5c4fjsne8380714294f',
                'X-RapidAPI-Host': 'youtube-v3-lite.p.rapidapi.com',
            }
          });
            console.log(response.data.items)
            setChannelData(response.data.items);
            setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchChannel();
  },[]);

  //channelVideos
  useEffect (() => {
    const fetchChannelVideos = async () => {
        try {
          const response = await axios.get('https://youtube-v3-lite.p.rapidapi.com/search', {
            method: 'GET',
            params: {
              channelId: search,
              part: 'id,snippet'
            },
             headers: {
                'X-RapidAPI-Key': 'cd936098damshc833db44e93774ep1f5c4fjsne8380714294f',
                'X-RapidAPI-Host': 'youtube-v3-lite.p.rapidapi.com',
            }
          });
            console.log(response.data.items)
            setChannelVideos(response.data.items);
            setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchChannelVideos();
  },[]);

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
