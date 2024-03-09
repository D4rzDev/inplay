"use client"
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { FaBell,FaArrowLeft } from "react-icons/fa";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { FaMessage } from "react-icons/fa6";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

interface VideoItem {
    statistics:{
        commentCount: string;
        likeCount: string;
        viewCount: string;

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

interface CommentItem {
    snippet: {
        totalReplyCount: string;
        topLevelComment: {
            snippet: {
                authorChannelUrl: string;
                authorDisplayName: string;
                authorProfileImageUrl: string;
                textOriginal: string;
                likeCount: string;

            }
        }
        
    };
}

interface RelatedVideo {
    id:{
        videoId: string;
    }
    snippet: {
        title: string;
        channelTitle: string;
        thumbnails: {
            high: {
                url: string;
            };
            default: {
                url: string;
            };
        };
    };
}

const side = ['bottom'];

export default function Video () {
    const searchParams = useSearchParams();
    const search = searchParams.get('search');
    const [videos, setVideos] = useState<VideoItem[]>([]);
    const [relatedvideos, setRelatedVideos] = useState<RelatedVideo[]>([]);
    const [comments, setComments] = useState<CommentItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const side = "bottom";

    //video
     useEffect(() => {
      const fetchVideos = async () => {
        try {
          const response = await axios.get('https://youtube-v3-lite.p.rapidapi.com/videos', {
            method: 'GET',
            params: {
                id: search,
                part: 'snippet,contentDetails,statistics'
            },
             headers: {
                'X-RapidAPI-Key': 'cd936098damshc833db44e93774ep1f5c4fjsne8380714294f',
                'X-RapidAPI-Host': 'youtube-v3-lite.p.rapidapi.com',
            }
          });
            console.log(response.data.items);
            setVideos(response.data.items);
            setIsLoading(false);
        } catch (error) {
          console.error('Error fetching videos:', error);
        }
      };

      fetchVideos();
    }, []);

    //videoComments
    useEffect(() => {
      const videoComments = async () => {
        try {
          const response = await axios.get('https://youtube-v3-lite.p.rapidapi.com/comments', {
            method: 'GET',
            params: {
                id: search,
                part: 'snippet,contentDetails,statistics'
            },
             headers: {
                'X-RapidAPI-Key': 'cd936098damshc833db44e93774ep1f5c4fjsne8380714294f',
                'X-RapidAPI-Host': 'youtube-v3-lite.p.rapidapi.com',
            }
          });
            console.log("comments",response.data.items);
            setComments(response.data.items);
            setIsLoading(false);
        } catch (error) {
          console.error('Error fetching comments:', error);
        }
      };

      videoComments();
    }, []);

    //related videos
     useEffect(() => {
      const fetchRelatedVideos = async () => {
        try {
          const response = await axios.get('https://youtube-v3-lite.p.rapidapi.com/search', {
            method: 'GET',
            params: {
                relatedToVideoId: search,
                part: 'id,snippet',
                type: 'video'
            },
             headers: {
                'X-RapidAPI-Key': 'cd936098damshc833db44e93774ep1f5c4fjsne8380714294f',
                'X-RapidAPI-Host': 'youtube-v3-lite.p.rapidapi.com',
            }
          });
            console.log("relatedVideos",response.data.items);
            setRelatedVideos(response.data.items);
            console.log(search);
            setIsLoading(false);
        } catch (error) {
          console.error('Error fetching videos:', error);
        }
      };

      fetchRelatedVideos();
    }, []);

    

    return (
        <div className=" flex flex-col gap-2">
           
            <div className=" bg-zinc-950 sticky top-0 p-4 z-10">
                <Link href={'/'}>
                 <FaArrowLeft size={25}/>
                </Link>
            </div>
           
        { isLoading ? (
            <div className=" grid grid-cols-1 gap-8 px-4">
                     {[...Array(50)].map((_, index) => (
                        <div key={index} className=" flex flex-col gap-2" >
                            <Skeleton className="h-[180px] w-full md:h-[505px] rounded-lg" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[200px]" />
                            </div>
                        </div>
                    ))}
                </div>
        ):(
            <div className=" p-4">
                { videos.map ((video, idx) => (
                    <div key={idx}>
                        <iframe src={`https://youtube.com/embed/${search}?autoplay=0`} allowFullScreen className="w-full h-[180px] md:h-[505px]"/>

                        <h1 className=" mt-2">{video.snippet.title}</h1>
                        <p className=" font-sans line-clamp-2 mt-2">{video.snippet.description}</p>

                        <div className=" flex items-center gap-4 mt-4">
                            <p className=" text-xs  text-zinc-400 font-sans">{video.statistics.viewCount} views</p>
                            <div className=" flex items-center justify-center gap-4">
                                <div className=" flex items-center justify-center text-xs font-sans gap-2">
                                    <BiSolidLike size={20} className=" text-[#e473ff]"/>
                                    <p className=" text-zinc-400">{video.statistics.likeCount}</p>
                                </div>

                                <div className=" flex items-center justify-center text-xs font-sans gap-2">
                                    <BiSolidDislike size={20} className=" text-[#e473ff]"/>
                                </div>

                            </div>
                        </div>
                        <div className=" flex items-center justify-between mt-4">
                            <Link href={`/channel/?search=${video.snippet.channelId}`} passHref>
                            <div className=" flex items-center justify-center gap-2">
                                <p className=" font-sans text- font-bold text-gray-200 ">{video.snippet.channelTitle}</p>
                                <IoIosCheckmarkCircle className=" text-[#e473ff]"/>
                            </div>
                            </Link>
                            <FaBell className=" text-[#e473ff]"/>
                        </div>
                        <div className=" flex items-center gap-2 text-sm font-sans mt-4">
                            <Sheet key={side}>
                                <SheetTrigger className=" flex items-center gap-2">
                                    <p>Comments </p>
                                    <p className=" text-zinc-500">{video.statistics.commentCount}</p>
                                </SheetTrigger>
                                <SheetContent side={side} className=" h-screen p-4 overflow-scroll">
                                    <SheetHeader >
                                    <SheetTitle>Comments</SheetTitle>
                                    </SheetHeader>
                                    <div className="flex flex-col gap-6 mt-4">
                                    { comments.map((comment, idx)=>(
                                            <div className=" flex gap-2" key={idx}>
                                                <Image src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="img" width={500} height={500} className=" h-8 w-8 rounded-full" />
                                                <div className=" flex flex-col gap-4">
                                                    <p className=" text-xs font-sans text-zinc-400">{comment.snippet.topLevelComment.snippet.authorDisplayName}</p>
                                                    <p className=" text-sm font-sans">{comment.snippet.topLevelComment.snippet.textOriginal}</p>
                                                    <div className=" flex items-center gap-4">
                                                        <div className=" flex items-center gap-2">
                                                            <BiSolidLike size={15} className="text-[#e473ff]"/>
                                                            <p className=" text-xs font-sans text-zinc-400">{comment.snippet.topLevelComment.snippet.likeCount}</p>
                                                        </div>
                                                        <BiSolidDislike size={15} className="text-[#e473ff]"/>
                                                        <FaMessage size={15} className="text-[#e473ff] ml-2"/>
                                                    </div>
                                                    <p className=" text-xs font-sans text-zinc-400">{comment.snippet.totalReplyCount} replies</p>
                                                </div>
                                            </div>
                                    ))}
                                    </div>

                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>

                ))}
                
                <div className=" flex flex-col gap-4 mt-4">
                    <p className=" text-sm font-sans">Related Videos</p>
                    <div className=" grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        { relatedvideos.filter(video => video.snippet.thumbnails.high && video.snippet.thumbnails.high.url).map ((video, idx) =>(
                        <div key={idx} className=" flex flex-col gap-2"  >
                            <Link href={`${video.id.videoId}?search=${video.id.videoId}`} passHref> 
                                <Image src={video.snippet.thumbnails.high.url} alt="" width={500} height={500} className=" w-screen bg-slate-500 h-[180px] md:h-[180px] object-cover" />
                                <p className="line-clamp-2 mt-2">{video.snippet.title}...</p>
                                <div className=" flex items-center gap-1 mt-2">
                                    <p className=" font-sans text-sm text-gray-400 ">{video.snippet.channelTitle}</p>
                                    <IoIosCheckmarkCircle className=" text-[#e473ff]"/>
                                </div>
                            </Link>
                    </div>
                        ))}
                </div>
                    
                </div>
                
            </div>
            )}
            
            
        </div>
    )
}