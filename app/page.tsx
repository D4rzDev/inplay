"use client"
import Sidebar from "./components/sidebar";
import FetchData from "./components/fetchdata";
import { useState } from "react";
import Navbar from "./components/navbar";

export default function Home() {

  const [selectedCategory, setSelectedCategory] = useState<string>('Trending');

  return (
    <section className=" flex flex-col px-2 md:px-4 h-screen bg-inherit">
      <Navbar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}  />
      <div className=" flex flex-col px-4 h-screen md:flex-row">
        <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}  />
        <FetchData selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
      </div>
    </section>
  )
}
