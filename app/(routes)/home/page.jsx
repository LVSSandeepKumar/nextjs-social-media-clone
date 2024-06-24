"use client";
import React, { useState } from 'react'
import Banner from './_components/Banner'
import { useUser } from '@clerk/nextjs';
import CreatePost from './_components/CreatePost';

function Home() {

  const {user} = useUser();
  
  return (
    <div className='p-5 px-10'>
      { !user ? <Banner />
      : <CreatePost /> }      
    </div>
  )
}

export default Home