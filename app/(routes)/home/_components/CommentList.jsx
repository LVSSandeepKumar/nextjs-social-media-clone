import { MoreVertical, Trash } from "lucide-react";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { UserDetailsContext } from "../../_context/UserDetailsContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import GlobalApi from "@/app/_utils/GlobalApi";
import { toast } from "@/components/ui/use-toast";

const CommentList = ({ commentList, updatePostList }) => {
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);
  const [commentListData, setCommentListData] = useState(commentList);

  const onDeleteComment = (comment) => {
    const result = commentListData.filter(item => item._id != comment._id);
    setCommentListData(result);

    GlobalApi.deleteComment(comment._id).then(resp => {
        if(resp) {
            toast({
                title : 'Done !!',
                description : 'Comment deleted successfully.'
            })
        }
    })
    updatePostList();
  }

  return (
    <div>
      {commentListData.map((item, index) => (
        <div className="flex p-3 border items-center rounded-lg m-2">
          <div className="flex items-center gap-3 w-full">
            <Image
              src={item?.createdBy?.image}
              alt="user image"
              width={30}
              height={30}
              className="rounded-full"
            />
            <h2 className="bg-slate-100 rounded-lg p-2">{item?.commentText}</h2>
          </div>
          {item.createdBy?._id == userDetails?._id && (
            <Popover>
              <PopoverTrigger>
                <MoreVertical className="h-5 w-5 cursor-pointer" />
              </PopoverTrigger>
              <PopoverContent>
                <Button className="flex gap-2 w-full" variant="outline"
                onClick={() => onDeleteComment(item)}>
                    <Trash /> Delete
                </Button>
              </PopoverContent>
            </Popover>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentList;
