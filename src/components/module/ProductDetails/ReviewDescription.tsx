"use client";
import { Tabs, Tab, CardBody, Card } from "@heroui/react";
import React from "react";

import UserCard from "../../ui/UserCard";

import { IReview } from "@/src/interface";

const ReviewTab = ({ review }: { review: IReview[] }) => {
  const [selected, setSelected] = React.useState("reviews");

  return (
    <div className="flex w-full flex-col ">
      <Tabs
        aria-label="Options"
        className="flex  "
        selectedKey={selected}
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

        <Tab key="music" className=" text-xl" title="Description">
          <Card>
            <CardBody>its description</CardBody>
          </Card>
        </Tab>
        <Tab key="videos" className=" text-xl" title="Videos">
          <Card>coming sooon</Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default ReviewTab;
