"use client";

import React from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/react";
import toast from "react-hot-toast";

import CouponScopeSection from "../_Component/CouponScopeSection";

import EForm from "@/src/components/form/EForm";
import EInput from "@/src/components/form/EInput";
import ESelect from "@/src/components/form/ESelect";
import ETextArea from "@/src/components/form/ETextArea";
import Container from "@/src/components/ui/Container";
import { useGetAllCategoryQuery } from "@/src/redux/feature/admin/admin.categoryapi";
import { useCreateCouponMutation } from "@/src/redux/feature/coupon/coupon.api";
import { useGetProductByShopIdQuery } from "@/src/redux/feature/vendor/vendor.api";
import EDatePicker from "@/src/components/form/EDatePicker";
import { useGetCurrentUserQuery } from "@/src/redux/feature/auth/auth.api";

const AddCouponPage = () => {
  const { data: categoryList } = useGetAllCategoryQuery(undefined);
  const { data: userShopData } = useGetCurrentUserQuery(undefined);
  const shopId = userShopData?.data?.shop?.id;

  const { data: productList } = useGetProductByShopIdQuery(
    { shopId },
    {
      skip: !shopId,
    },
  );

  const [createCoupon] = useCreateCouponMutation();

  // watch apply type

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const payload = {
        code: data.code,
        title: data.title,
        description: data.description,

        type: "VENDOR",
        scope: data.scope,

        maxUsage: Number(data.maxUsage),
        maxUsagePerUser: Number(data.maxUsagePerUser),

        startDate: data.startDate.toDate().toISOString(),
        endDate: data.endDate.toDate().toISOString(),

        benefit: {
          discountType: data.discountType,
          value: Number(data.discountValue),
          maxDiscount: Number(data.maxDiscount),
        },

        rules: {
          minPurchase: Number(data.minPurchase),
          minQuantity: Number(data.minQuantity),
          categoryIds: data.categoryIds || [],
          productIds: data.productIds || [],
          newUserOnly: data.newUserOnly === "true",
        },
      };

      console.log(payload, "payload");

      await createCoupon(payload).unwrap();
      toast.success("Coupon Created Successfully");
    } catch (err) {
      console.log(err);

      toast.error("Failed to create coupon");
    }
  };

  return (
    <Container>
      <div className="bg-white p-5 mt-4 text-black">
        <h2 className="text-xl font-bold">Create Coupon</h2>

        <Divider className="my-4" />

        <EForm
          defaultValues={{
            title: "hi",
            code: "JOYBE",
            description: "hi baby",
            discountType: "FIXED",
            discountValue: 44,
            maxDiscount: 44,
            maxUsage: 4,
          }}
          onSubmit={onSubmit}
        >
          {/* ================= BASIC INFO ================= */}
          <h3 className="font-semibold mb-2">Basic Info</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <EInput label="Coupon Code" name="code" placeholder="Coupon code" />
            <EInput label="Title" name="title" placeholder="title" />
          </div>

          <ETextArea
            label="Description"
            name="description"
            placeholder="Coupon Description"
          />

          {/* ================= SCOPE ================= */}
          <Divider className="my-6" />
          <h3 className="font-semibold mb-2">Coupon Scope</h3>

          <ESelect
            label="Scope"
            name="scope"
            options={[
              { label: "Cart", id: "CART" },
              { label: "Product", id: "PRODUCT" },
              { label: "Shipping", id: "SHIPPING" },
            ]}
          />

          {/* ================= APPLY TYPE ================= */}
          <Divider className="my-6" />
          <h3 className="font-semibold mb-2">Apply Coupon To</h3>

          <CouponScopeSection
            categoryList={categoryList?.data}
            productList={productList?.data?.data}
          />

          {/* ================= BENEFIT ================= */}
          <Divider className="my-6" />
          <h3 className="font-semibold mb-2">Discount Benefit</h3>

          <div className="grid md:grid-cols-3 gap-4">
            <ESelect
              label="Discount Type"
              name="discountType"
              options={[
                { label: "Percentage", id: "PERCENTAGE" },
                { label: "Fixed", id: "FIXED" },
              ]}
            />

            <EInput
              label="Discount Value"
              name="discountValue"
              placeholder="value"
              type="number"
            />

            <EInput
              label="Max Discount"
              name="maxDiscount"
              placeholder="Max discount"
              type="number"
            />
          </div>

          {/* ================= RULES ================= */}
          <Divider className="my-6" />
          <h3 className="font-semibold mb-2">Coupon Rules</h3>

          <div className="grid md:grid-cols-3 gap-4">
            <EInput
              label="Minimum Purchase"
              name="minPurchase"
              placeholder="Minimum amount"
              type="number"
            />

            <EInput
              label="Minimum Quantity"
              name="minQuantity"
              placeholder="Min quantity"
              type="number"
            />

            <ESelect
              label="New User Only"
              name="newUserOnly"
              options={[
                { label: "Yes", id: "true" },
                { label: "No", id: "false" },
              ]}
            />
          </div>

          {/* ================= USAGE LIMIT ================= */}
          <Divider className="my-6" />
          <h3 className="font-semibold mb-2">Usage Limit</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <EInput
              label="Max Usage"
              name="maxUsage"
              placeholder="Max usage"
              type="number"
            />

            <EInput
              label="Max Usage Per User"
              name="maxUsagePerUser"
              placeholder="Max use per user"
              type="number"
            />
          </div>

          {/* ================= DATE RANGE ================= */}
          <Divider className="my-6" />
          <h3 className="font-semibold mb-2">Validity</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <EDatePicker label="start Date" name="startDate" />
            <EDatePicker label="end Date" name="endDate" />

            {/* <EInput label="End Date" name="endDate" type="datetime-local" /> */}
          </div>

          <Divider className="my-6" />

          <Button className="bg-primary-color text-white" type="submit">
            Create Coupon
          </Button>
        </EForm>
      </div>
    </Container>
  );
};

export default AddCouponPage;
