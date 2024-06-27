import moment from "moment";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { UserDetailsContext } from "../../_context/UserDetailsContext";
import GlobalApi from "@/app/_utils/GlobalApi";
import { useUser } from "@clerk/nextjs";
import { MoreVertical, Send, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CommentList from "./CommentList";

const PostItem = ({ post, updatePostList }) => {
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);
  const { user } = useUser();
  const [userInputComment, setUserInputComment] = useState();

  const checkUserLike = (postLikes) => {
    return postLikes.find((item) => item?._id == userDetails?._id);
  };

  const onLikeClick = (postId, isLiked) => {
    const data = {
      userId: userDetails?._id,
      isLiked: isLiked,
    };

    GlobalApi.onPostLike(postId, data).then((resp) => {
      updatePostList();
    });
  };

  const addComent = (postId) => {
    const data = {
      commentText: userInputComment,
      createdBy: userDetails._id,
      createdAt: Date.now().toString(),
      post: postId,
    };

    GlobalApi.addComment(data).then((resp) => {
      if (resp) {
        toast({
          title: "Awesome!",
          description: "Your Comment has been added successfully.",
          variant: "success",
        });
        updatePostList();
        console.log(resp);
      }
    });
    setUserInputComment("");
  };

  const deletePost = () => {
    GlobalApi.deletePost(post._id).then((resp) => {
        if (resp) {
          toast({
            title: "Done !!",
            description: "Post deleted successfully.",
          });
        }
        updatePostList();
    });
  };

  return (
    <div className="p-5 border rounded-lg my-5">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <Image
            src={post?.createdBy.image}
            alt="user image"
            height={35}
            width={35}
            className="rounded-full"
          />

          <div>
            <h2 className="font-bold">{post?.createdBy.name}</h2>
            <h2 className="text-[12px] text-gray-500">
              {moment(Number(post?.createdAt)).format("DD MMM | hh:mm A")}
            </h2>
          </div>
        </div>
        {post.createdBy?._id == userDetails?._id && (
          <Popover>
            <PopoverTrigger>
              <MoreVertical className="h-5 w-5 cursor-pointer" />
            </PopoverTrigger>
            <PopoverContent>
              <Button
                className="flex gap-2 w-full"
                variant="outline"
                onClick={() => deletePost(post)}
              >
                <Trash /> Delete
              </Button>
            </PopoverContent>
          </Popover>
        )}
      </div>

      <div className="bg-slate-100 p-3 mt-4 rounded-lg">
        <h2>{post?.postText}</h2>
      </div>

      <div className="flex gap-8 mt-4 text-gray-500">
        <div className="flex gap-1 items-center">
          {!checkUserLike(post?.likes) ? (
            <svg
              onClick={() => onLikeClick(post?._id, true)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          ) : (
            <svg
              onClick={() => onLikeClick(post?._id, false)}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6 text-red-500 cursor-pointer"
            >
              <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
            </svg>
          )}
          <h2>{post?.likes?.length} Likes</h2>
        </div>

        <AlertDialog>
          <AlertDialogTrigger>
            <div className="flex gap-1 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                />
              </svg>
              <h2>{post?.comments?.length} Comments</h2>
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center justify-between">
                Comments <AlertDialogCancel>x</AlertDialogCancel>{" "}
              </AlertDialogTitle>
              <AlertDialogDescription>
                <CommentList
                  commentList={post?.comments}
                  updatePostList={() => updatePostList()}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="mt-3">
        <hr className="mb-3" />
        <div className="flex gap-2 items-center">
          <Image
            src={user?.imageUrl}
            width={30}
            height={30}
            alt="user=image"
            className="rounded-full"
          />
          <input
            onChange={(e) => setUserInputComment(e.target.value)}
            value={userInputComment}
            type="text"
            placeholder="Post a Comment"
            className="w-full bg-slate-100 p-2 rounded-full px-5 outline-blue-300"
          />
          <Button
            onClick={() => addComent(post._id)}
            disabled={!userInputComment}
            className="bg-blue-400 text-white p-2 h-8 w-8 rounded-xl hover:bg-blue-600"
          >
            <Send />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
