import React, { use } from "react";
import ShopPage from "../_component/ShopPage";

type Params = Promise<{ shopId: string }>;
const page = (props: { params: Params }) => {
  const param = use(props.params);
  const shopId = param.shopId;
  return <ShopPage shopId={shopId} />;
};

export default page;
