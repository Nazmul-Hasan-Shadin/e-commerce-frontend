"use client";

import { IReview } from "@/src/interface/review";
import { useCreateCommentMutation } from "@/src/redux/feature/comment/comment.api";
import { Textarea } from "@nextui-org/input";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoSendSharp } from "react-icons/io5";
import EForm from "../form/EForm";
import FxTextArea from "../form/ETextArea";
import { useGetCurrentUserQuery } from "@/src/redux/feature/auth/auth.api";
import { SubmitHandler } from "react-hook-form";
const CommentBox = ({ productId }: { productId: string }) => {
  const [handleCreate] = useCreateCommentMutation();
  const { data: userData } = useGetCurrentUserQuery(undefined);

  const handleComment: SubmitHandler<any> = async (data) => {
    console.log(data);

    const userCommentinfo = {
      userId: userData?.data?.id,
      comment: data?.comment,
      productId: productId,
      rating: 2,
    };

    try {
      const res = await handleCreate(userCommentinfo).unwrap();
      if (res.success) {
        toast.success("Comment created successful");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <div>
      <EForm onSubmit={handleComment}>
        <FxTextArea
          icon={true}
          placeholder="write your review here......"
          name="comment"
        />
      </EForm>
    </div>
  );
};

export default CommentBox;
