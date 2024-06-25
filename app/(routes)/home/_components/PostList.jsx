import GlobalApi from '@/app/_utils/GlobalApi';
import React, { useEffect, useState } from 'react'
import PostItem from './PostItem';
import { Skeleton } from '@/components/ui/skeleton';

const PostList = ({postList}) => {

  return (
    <div>
      {!postList ? postList.map((item, index) => (
        <div key={index}>
          <PostItem post={item}/>
        </div> 
      ))
      :
      <div>
        {
          [1,2,3].map((item, index) => (
            <Skeleton className='h-[200px] w-full bg-slate-200 animate-pulse my-5' />
          ))
        }
      </div>}
    </div>
  )
}

export default PostList