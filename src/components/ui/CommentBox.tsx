import { IReview } from "@/src/interface/review";
import { useCreateCommentMutation } from "@/src/redux/feature/comment/comment.api";
import { Textarea } from "@nextui-org/input";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoSendSharp } from "react-icons/io5";
const CommentBox = () => {
  const [handleCreate] = useCreateCommentMutation();
  const [comment, setComment] = useState("");

  const handleComment = async () => {
    try {
      const res = await handleCreate(comment).unwrap();
      if (res.success) {
        toast.success("Comment created successful");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <div>
      <Textarea
        key={"comment"}
        endContent={
          <IoSendSharp className="absolute bottom-1 right-2 text-2xl text-green-600" />
        }
        variant={"bordered"}
        labelPlacement="outside"
        placeholder="Write Your Comment here ..."
        className="col-span-12 md:col-span-6 mb-6 md:mb-0 relative"
      />
    </div>
  );
};

export default CommentBox;
