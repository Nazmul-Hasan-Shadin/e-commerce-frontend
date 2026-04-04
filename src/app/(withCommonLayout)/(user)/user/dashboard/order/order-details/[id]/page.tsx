import { Divider } from "@heroui/react";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

const orderDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const cookie = await cookies();
  const token = await cookie.get("refreshToken")?.value;
  const { id } = await params;

  const res = await fetch(`http://localhost:3001/api/v1/order/item/${id}`, {
    headers: {
      Authorization: token,
    },
    cache: "no-cache",
  });

  const orderInfo = await res.json();

  console.log(orderInfo);

  return (
    <div>
      <div className="bg-white p-6 mb-8 text-black">
        <h3 className="text-black font-semibold text-xl"> Order Details</h3>
        <Divider className="w-full my-6 bg-gray-300" />
        <div className="flex justify-between bg-[#F8F8F8] p-2">
          <p>
            Delivery type :
            <span className="font-bold"> Standard Delivery </span>
          </p>
          <p>
            Total :{" "}
            <span className="font-bold">
              {orderInfo?.data?.price * orderInfo?.data?.quantity}
            </span>{" "}
            bdt
          </p>
        </div>
        <Divider className="w-full my-6 bg-gray-300" />
        <section className="grid grid-cols-12 ">
          <div className="col-span-12 p-2 flex bg-[#F8F8F8] justify-between">
            <p>Order No: {orderInfo?.data?.id}</p>
            <p>paid test </p>
          </div>
          <Divider className="w-full col-span-12 my-6 bg-gray-300" />
          <div className="col-span-12 sm:col-span-8 2xl:col-span-12 mr-3  ">
            {/* ==========Tables Header============ */}
            <div className=" grid-cols-8  text-black hidden sm:grid sm:grid-cols-8 font-bold  text-lg text-center p-2">
              <div className="">image</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="">Seller Name</div>

              <div className="">Amount</div>
              <div className=""> Order Status</div>
            </div>
            <Divider className="w-full my-6 bg-gray-300" />
            {/* ================cart items under cart row heading=============== */}

            {orderInfo?.data && Object.keys(orderInfo?.data).length > 0 ? (
              <div>
                <div key={orderInfo?.data?.id}>
                  <div className="">
                    <div
                      key={orderInfo?.data.id}
                      className="grid  grid-cols-8 justify-items-center my-4"
                    >
                      <figure>
                        <Image
                          alt="cart product image"
                          height={300}
                          objectFit="contain"
                          src={orderInfo?.data?.product?.images[0]}
                          width={90}
                        />
                      </figure>

                      <h2 className="col-span-3 text-sm sm:text-medium font-medium md:font-bold">
                        {orderInfo?.data?.quantity}
                      </h2>

                      <div className="flex  justify-center">
                        <Link href={`/shop/${orderInfo?.data?.shop?.id}`}>
                          <p className="text-sm text-primary-color md:text-medium">
                            {" "}
                            {
                              orderInfo?.data?.product?.shop?.vendor?.username
                            }{" "}
                          </p>
                        </Link>
                      </div>

                      <p className="text-sm md:text-medium">
                        ${orderInfo?.data?.price * orderInfo?.data?.quantity}
                      </p>

                      <p className="text-sm md:text-medium">
                        {orderInfo?.data?.order?.status}
                      </p>
                    </div>
                    <Divider className="w-full my-6 bg-gray-300" />
                  </div>
                  <Divider className="w-[97%]  mx-auto" />
                </div>

                {/* ===================order summery===================== */}

                <div className="p-4">
                  <h2 className="text-xl font-bold mb-6">Order Summery</h2>
                  <div className="flex justify-between">
                    <p className="text-lg">Payment Method </p>
                    {orderInfo?.data?.order?.paymentMethod}
                  </div>

                  <div className="flex justify-between">
                    <p className="text-lg">Product Price </p>
                    {orderInfo?.data?.price * orderInfo?.data?.quantity}
                  </div>

                  <div className="flex justify-between">
                    <p className="text-lg">Delivery Charge </p>
                    50
                  </div>
                  <Divider className="w-full my-6 bg-gray-300" />

                          <div className="flex justify-between">
                    <p className="text-lg">Grand Total </p>
                  {orderInfo?.data?.price * orderInfo?.data?.quantity} 
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-52  flex justify-center items-center">
                <h3 className="text-black">Oh no ! your cart is empty</h3>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default orderDetailsPage;
