"use client";

import { IReview } from "@/src/interface/review";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
} from "@nextui-org/react";
import React from "react";

const UserCard = ({ review }: { review: IReview[] }) => {
  const [isFollowed, setIsFollowed] = React.useState(false);

  return (
    <div>
      {review!.map((review: IReview) => {
        console.log(review, "iam fatatkisio");

        return (
          <Card key={review.id} className="max-w-[470px] mb-6 bg-[#e9eaef] ">
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
            </CardHeader>
            <CardBody className="px-3 py-0 text-small text-default-800 overflow-hidden">
              <p className="text-black">{review?.comment}</p>
              <span className="pt-2">
                <span className="py-2" aria-label="computer" role="img">
                  {review?.comment}
                </span>
              </span>
            </CardBody>
            <CardFooter className="gap-3">
              <div className="flex gap-1">
                <p className="font-semibold text-default-600 text-small">4</p>
                <p className=" text-default-600 text-small">Following</p>
              </div>
              <div className="flex gap-1">
                <p className="font-semibold text-default-600 text-small">
                  97.1K
                </p>
                <p className="text-default-600 text-small">Followers</p>
                <p className="text-default-600 text-small">Replay</p>
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default UserCard;
