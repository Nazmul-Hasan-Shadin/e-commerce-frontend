"use client";

import React from "react";
import toast from "react-hot-toast";
import { SubmitHandler } from "react-hook-form";

import EForm from "../form/EForm";
import FxTextArea from "../form/ETextArea";

import { useGetCurrentUserQuery } from "@/src/redux/feature/auth/auth.api";
import { useCreateCommentMutation } from "@/src/redux/feature/comment/comment.api";
import { Divider } from "@nextui-org/react";
const CommentBox = ({ productId }: { productId: string }) => {
  const [handleCreate] = useCreateCommentMutation();
  const { data: userData } = useGetCurrentUserQuery(undefined);
 console.log(userData,'currenuserdaata');
 
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
    <div className="border p-5">
      <h3 className="text-xl">Drop Your Review here </h3>
      <Divider className="my-4"/>
      <EForm onSubmit={handleComment}>
        <FxTextArea
          icon={true}
          name="comment"
          placeholder="write your review here......"
        />
      </EForm>
    </div>
  );
};

export default CommentBox;
