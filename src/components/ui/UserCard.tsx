"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Divider,
} from "@heroui/react";
import React from "react";
import { AiTwotoneLike } from "react-icons/ai";

import { FaCommentAlt } from "react-icons/fa";

import { IReview } from "@/src/interface/review";

const UserCard = ({ review }: { review: IReview[] }) => {
  const [isFollowed, setIsFollowed] = React.useState(false);
  console.log(review, "iam review");

  return (
    <div className="text-black bg-white border p-5">
      <h3>Review</h3>
      <Divider className="my-4" />

      <div className={` h-64 ${review.length ? "h-auto" : ""}`}>
        {review && review.length ? (
          review.map((review: IReview) => {
            return (
              <div key={review.id} className=" text-black h-auto ">
                <div>
                  <Card className=" mb-6 border-none ">
                    <CardHeader className="justify-between">
                      <div className="flex gap-5">
                        <Avatar
                          isBordered
                          radius="full"
                          size="md"
                          src="https://nextui.org/avatars/avatar-1.png"
                        />
                        <div className="flex flex-col gap-1 items-start justify-center">
                          <h4 className="text-small font-semibold leading-none text-default-600">
                            {review?.user?.username}
                          </h4>
                          <h5 className="text-small tracking-tight text-default-400">
                            {review?.user?.username}
                          </h5>
                        </div>
                      </div>
                      <span className="text-sm p-2">4 hour ago</span>
                    </CardHeader>
                    <CardBody className="px-3 py-0 text-small text-default-800 overflow-hidden">
                      <p className="text-black">{review?.comment}</p>
                      <span className="pt-2">
                        <span aria-label="computer" className="py-2" role="img">
                          {review?.comment}
                        </span>
                      </span>
                    </CardBody>
                    <CardFooter className="gap-4 mt-4">
                      <div className="flex gap-1">
                        <AiTwotoneLike />
                      </div>
                      <div className="flex gap-1">
                        <p className="text-default-600 text-small">Replay</p>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            );
          })
        ) : (
          <div className=" flex flex-col items-center justify-center text-black h-full ">
            <div className="flex flex-col items-center">
              <FaCommentAlt className="text-5xl" />
              <p>No review found for this product</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
