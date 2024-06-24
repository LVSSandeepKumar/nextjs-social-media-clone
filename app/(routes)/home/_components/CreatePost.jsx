import GlobalApi from '@/app/_utils/GlobalApi';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs'
import { Image, Send, Video } from 'lucide-react';
import React, { useContext, useState } from 'react'
import { UserDetailsContext } from '../../_context/UserDetailsContext';
import { useToast } from '@/components/ui/use-toast';

const CreatePost = () => {

    const {user} = useUser();
    const [userInputPost, setUserInputPost] = useState();
    const {userDetails, setUserDetails} = useContext(UserDetailsContext);
    const {toast} = useToast();

    const onCreatePost = () => {
        const data = {
            postText : userInputPost,
            createdAt : Date.now().toString(),
            createdBy : userDetails._id
        }

        GlobalApi.createPost(data).then(resp => {
            console.log(resp);
            setUserInputPost('');
            resp && toast({
                title: "Awesome!",
                description: "Your Post has been published successfully.",
                variant : "success"
              })
        }, (error) => {
            toast({
                title: "OOPS !!!!",
                description: "Some Server Side Error",
                variant : "destructive"
              })
    })
    }

  return (
    <div>
        <h2 className='text-[30px] font-medium text-gray-600'>
            Hello, {user.fullName}
        </h2>
        <h2 className='text-gray-400'>What's in your mind ?</h2>
        <div className='p-2 rounded-lg border mt-5 bg-slate-100'>
            <h2>Create a Post</h2>
            <div className='p-4 bg-white rounded-lg'>
                <textarea placeholder="What's up" 
                    className='w-full outline-none'
                    value={userInputPost}
                    onChange={(e) => setUserInputPost(e.target.value)}
                />
            </div>
            <div className='mt-2 flex justify-between'>
                <div className='flex gap-5'>
                    <h2 className='flex p-2 gap-2 items-center cursor-pointer hover:bg-slate-300 rounded-lg'><Image className='h-5 w-5'/> Image</h2>
                    <h2 className='flex p-2 gap-2 items-center cursor-pointer hover:bg-slate-300 rounded-lg'><Video className='h-5 w-5'/> Video</h2>
                </div>
                <Button className="bg-blue-500 rounded-xl gap-2 hover:bg-blue-700"
                disabled={!userInputPost}
                onClick={() => onCreatePost()}>
                    Publish <Send className='h-4 w-4' />
                </Button>     
            </div>
        </div>
    </div>
  )
}

export default CreatePost