"use client";

import { Divider, Button, divider } from "@heroui/react";
import Image from "next/image";

import Container from "@/src/components/ui/Container";
import { useGetAllOrderQuery } from "@/src/redux/feature/order/order.api";

import { IReview } from "@/src/interface";
import { format } from "date-fns";
import { useGetMyReviewInfiniteQuery } from "@/src/redux/feature/comment/comment.api";
import { useEffect, useRef } from "react";

const Review = () => {
  const {
    data: reviewData,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetMyReviewInfiniteQuery(7);

  const loaderRef = useRef(null);

  useEffect(() => {
    if (!loaderRef.current) return; // null check

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("Reached bottom!");
          fetchNextPage();
        }
      });
    });

    observer.observe(loaderRef.current);
  }, [loaderRef.current]);

  console.log(loaderRef, "oloard");

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading orders</div>;

  return (
    <Container className="mx-auto">
      <div className="font-bold border   md:p-5 bg-white">
        <h1 className="text-xl my-4">My Reviews</h1>
        <Divider className="mb-5" />
        <div className="border rounded-lg overflow-x-auto">
          {/* ======== TABLE HEADER ======== */}
          <div className="lg:grid grid-cols-10 hidden justify-items-center lg:flex-row font-semibold text-center p-4 bg-gray-100 text-sm">
            <div className="col-span-2">product name</div>
            <div className="col-span-3">comment</div>
            <div className="col-span-2">rating</div>

            <div className="col-span-2">created Date</div>
          </div>

          <Divider className="w-[97%] mx-auto mb-4" />

          {/* ======== TABLE CONTENT ======== */}
          {reviewData?.pages.length ? (
            <div className=" h">
              {reviewData.pages.flatMap((page, pageIndex) =>
                page?.data.map((review: IReview) => (
                  <div key={review.id}>
                    <div className="hidden md:block">
                      <div>
                        <div className="grid grid-cols-10 justify-items-center  my-4 px-2 text-sm">
                          {/* Product image */}

                          <h2 className="col-span-2 text-center font-medium">
                            {review?.product?.name}
                          </h2>

                          <p className="col-span-3 text-center font-semibold">
                            {review?.comment?.slice(0, 30)}
                          </p>

                          <p className="col-span-2 text-center font-semibold">
                            {review?.rating}
                          </p>

                          <p className="col-span-2 text-center font-semibold">
                            {review?.createdAt &&
                              format(new Date(review?.createdAt), "yyyy-mm-dd")}
                          </p>
                        </div>
                      </div>

                      <Divider className="w-[97%] mx-auto" />
                    </div>
                  </div>
                ))
              )}

              {/* scroll trigger div */}

              <div className="my-5 w-[80%] ">
                <div className="flex gap-3 justify-end">
                  <Button className="rounded-none" variant="ghost">
                    Prev
                  </Button>
                  <Button
                    onPress={() => fetchNextPage()}
                    className="rounded-none"
                    variant="ghost"
                  >
                    Next
                  </Button>
                </div>
              </div>

              {/* ===============for small device only========= */}
              {/* {orderData?.data.map((orderData) => (
                <div key={orderData?.id} className="p-2 md:hidden">
                  <div className="flex gap-4 mb-4">
                    <figure>
                      <Image
                        height={70}
                        width={70}
                        src={
                          orderData?.orderItems?.[0]?.product?.images?.[0] ||
                          "/no-image.jpg"
                        }
                        alt="product image"
                      />
                    </figure>
                    <div className="font-normal">
                      <h3 className="text-sm ">Mini laptop del inspiron 35</h3>
                      <p className="text-xs text-gray-400">
                        color family : black
                      </p>
                      <p>$ {orderData?.totalAmount}</p>
                    </div>
                  </div>
                </div>
              ))} */}
            </div>
          ) : (
            <div className="h-52 flex justify-center items-center">
              <h3>Review not found</h3>
            </div>
          )}
        </div>

        <div className="h-[800px]" ref={loaderRef}></div>
      </div>
    </Container>
  );
};

export default Review;
