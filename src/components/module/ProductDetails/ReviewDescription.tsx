"use client";
import { Tabs, Tab, CardBody, Card } from "@nextui-org/react";
import React from "react";
import UserCard from "../../ui/UserCard";
import { IReview } from "@/src/interface/review";

const ReviewTab = ({ review }: { review: IReview[] }) => {
  const [selected, setSelected] = React.useState("reviews");
  return (
    <div className="flex w-full flex-col ">
      <Tabs
        aria-label="Options"
        selectedKey={selected}
        className="flex  "
        variant="underlined"
        onSelectionChange={(key: string | number) => setSelected(key as string)}
      >
        <Tab
          key="reviews"
          className=" text-xl  text-primary-color "
          title="reviews"
        >
          <UserCard review={review} />
        </Tab>
        <Tab className=" text-xl" key="music" title="Description">
          <Card>
            <CardBody>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </CardBody>
          </Card>
        </Tab>
        <Tab className=" text-xl" key="videos" title="Videos">
          <Card>coming sooon</Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default ReviewTab;
