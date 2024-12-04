import { Textarea } from "@nextui-org/input";
import React from "react";
import { IoSendSharp } from "react-icons/io5";
const CommentBox = () => {
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
