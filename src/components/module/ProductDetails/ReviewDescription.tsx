"use client";
import { Tabs, Tab, CardBody, Card } from "@nextui-org/react";
import React from "react";
import UserCard from "../../ui/UserCard";

const ReviewTab = () => {
  const [selected, setSelected] = React.useState("reviews");
  return (
    <div className="flex w-full flex-col ">
      <Tabs
        aria-label="Options"
        selectedKey={selected}
        className="flex justify-center"
        variant="underlined"
        onSelectionChange={setSelected}
      >
        <Tab key="reviews" className=" text-2xl" title="reviews">
          <UserCard />
        </Tab>
        <Tab className=" text-2xl" key="music" title="Music">
          <Card>
            <CardBody>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </CardBody>
          </Card>
        </Tab>
        <Tab className=" text-2xl" key="videos" title="Videos">
          <Card>
            <CardBody>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default ReviewTab;
