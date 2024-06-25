"use client";
import React, { useEffect, useState } from 'react'
import Banner from './_components/Banner'
import { useUser } from '@clerk/nextjs';
import CreatePost from './_components/CreatePost';
import PostList from './_components/PostList';
import GlobalApi from '@/app/_utils/GlobalApi';

function Home() {

  const {user} = useUser();

  const [postList, setPostList] = useState([]);

    const getAllPosts = ( ) => {
        GlobalApi.getAllPosts().then(resp => {
            setPostList(resp.data);
            console.log(resp.data);
        })
    }

    useEffect(() => {
        getAllPosts();
    }, [])
  
  return (
    <div className='p-5 px-10'>
      { !user ? <Banner />
      : <CreatePost getAllPosts={() => getAllPosts()} /> }      
      <PostList postList={postList}/>
    </div>
  )
}

export default Home