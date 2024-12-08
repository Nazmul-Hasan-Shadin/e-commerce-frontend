"use client";
import EForm from "@/src/components/form/EForm";
import ESelect from "@/src/components/form/ESelect";
import Card from "@/src/components/ui/Card";
import Container from "@/src/components/ui/Container";
import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

const FlashDeal = () => {
  const [flashProduct, setFlashProduct] = useState([]);
  console.log(flashProduct, "flashproduct");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/data.json"); // Wait for the response
        const data = await response.json(); // Parse the JSON data
        setFlashProduct(data);
      } catch (error) {
        console.log("Error fetching data:", error); // Handle any errors
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="relative">
        <div className="bg-[url('/flash.jpg')] w-full h-80 bg-cover bg-center"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black/50 p-4">
          <h2 className="text-2xl font-bold mb-2">
            Home 19 Collection Flash Deals
          </h2>
          <p className="max-w-lg">
            Nullam aliquet vestibulum augue non varius. Cras cosmo congue an
            melitos. Duis tristique del ante le maliquam praesent murna de
            tellus laoreet cosmopolis. Quisque hendrerit nibh an purus.
          </p>
        </div>

        {/* =========================filter for products========================= */}
      </div>
      <Container>
        <EForm onSubmit={onSubmit}>
          <div className="w-4/5 mx-auto z-40">
            <span className="text-2xl font-bold"> Filter By</span>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-1  mx-auto items-center ">
              <ESelect
                label="Price"
                name="price"
                options={[
                  { key: "1", label: "price" },
                  { key: "2", label: "price" },
                  { key: "3", label: "price" },
                ]}
              />
              <ESelect
                label="price"
                name="price"
                options={[
                  { key: "1", label: "price" },
                  { key: "2", label: "price" },
                  { key: "3", label: "price" },
                ]}
              />
              <ESelect
                label="price"
                name="price"
                options={[
                  { key: "1", label: "price" },
                  { key: "2", label: "price" },
                  { key: "3", label: "price" },
                ]}
              />
              <ESelect
                label="price"
                name="price"
                options={[
                  { key: "1", label: "price" },
                  { key: "2", label: "price" },
                  { key: "3", label: "price" },
                ]}
              />
              <ESelect
                label="price"
                name="price"
                options={[
                  { key: "1", label: "price" },
                  { key: "2", label: "price" },
                  { key: "3", label: "price" },
                ]}
              />
            </div>
          </div>
        </EForm>

        <h2>Flash Deal</h2>
        <div className="grid grid-cols-4 gap-4">
          {flashProduct?.map((product, key) => (
            <Card key={key} product={product} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default FlashDeal;
