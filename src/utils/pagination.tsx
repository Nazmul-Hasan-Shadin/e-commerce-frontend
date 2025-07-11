import { Pagination } from "@heroui/react";

export function Pagingation({
  productData,
  setPage,
}: {
  productData: any;
  setPage: any;
}) {
  const handlePagination = (value) => {
    setPage(value);
  };
  const total = Math.ceil(
    productData?.data?.meta?.total / productData?.data?.meta?.limit,
  );

  return (
    <div>
      <div className="my-12 flex justify-end w-[80%]">
        <Pagination
          isCompact
          showControls
          color="default"
          initialPage={productData?.data?.meta?.page}
          size="lg"
          total={total}
          onChange={(value) => handlePagination(value)}
        />
        ;
      </div>
    </div>
  );
}
