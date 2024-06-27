import { MoreVertical } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

const CommentList = ({commentList}) => {
  return (
    <div>
        {commentList.map((item, index) => (
            <div className='flex p-3 border items-center rounded-lg m-2'>
                <div className='flex items-center gap-3 w-full'>
                    <Image src={item?.createdBy?.image} alt='user image'
                        width={30} height={30} className='rounded-full'
                    />
                    <h2 className='bg-slate-100 rounded-lg p-2'>{item?.commentText}</h2>
                </div>
                <MoreVertical className='h-5 w-5 cursor-pointer'/>
            </div>
        ))}
    </div>
  )
}

export default CommentList;