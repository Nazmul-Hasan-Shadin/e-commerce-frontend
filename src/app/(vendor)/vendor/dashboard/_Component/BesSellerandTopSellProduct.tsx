import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Chip,
  Pagination,
} from "@heroui/react";

const BestSellingAndTopSellers = () => {
  //   const { data: currentUser } = useGetCurrentUserQuery();

  //   const [allProducts] = useGetAllProductQuery();

  // Static data for the tables
  const bestSellingProducts = [
    {
      name: "Branded T-Shirts",
      date: "24 Apr 2021",
      price: 29.0,
      orders: 62,
      stock: 510,
      amount: 1798,
      status: "In stock",
    },
    {
      name: "Bentwood Chair",
      date: "19 Mar 2021",
      price: 85.2,
      orders: 35,
      stock: 0,
      amount: 2982,
      status: "Out of stock",
    },
    {
      name: "Borosil Paper Cup",
      date: "01 Mar 2021",
      price: 14.0,
      orders: 80,
      stock: 749,
      amount: 1120,
      status: "In stock",
    },
    {
      name: "One Seater Sofa",
      date: "11 Feb 2021",
      price: 127.5,
      orders: 56,
      stock: 0,
      amount: 7140,
      status: "Out of stock",
    },
    {
      name: "Stillbird Helmet",
      date: "17 Jan 2021",
      price: 54.0,
      orders: 74,
      stock: 805,
      amount: 3996,
      status: "In stock",
    },
  ];

  const topSellers = [
    {
      name: "iTest Factory",
      seller: "Oliver Tyler",
      category: "Bags and Wallets",
      stock: 8547,
      amount: 541200,
      percentage: 32,
    },
    {
      name: "Digitech Galaxy",
      seller: "John Roberts",
      category: "Watches",
      stock: 895,
      amount: 75030,
      percentage: 79,
    },
    {
      name: "Nesta Technologies",
      seller: "Harley Fuller",
      category: "Bike Accessories",
      stock: 3470,
      amount: 45600,
      percentage: 90,
    },
    {
      name: "Zoetic Fashion",
      seller: "James Bowen",
      category: "Clothes",
      stock: 5488,
      amount: 29456,
      percentage: 40,
    },
    {
      name: "Meta4Systems",
      seller: "Zoe Dennis",
      category: "Furniture",
      stock: 4100,
      amount: 11260,
      percentage: 26,
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4">
      {/* Best Selling Products */}
      <div>
        <h2 className="text-xl font-bold mb-4">Best Selling Products</h2>
        <Table aria-label="Best Selling Products">
          <TableHeader>
            <TableColumn>Product</TableColumn>
            <TableColumn>Price</TableColumn>
            <TableColumn>Orders</TableColumn>
            <TableColumn>Stock</TableColumn>
            <TableColumn>Amount</TableColumn>
          </TableHeader>
          <TableBody>
            {bestSellingProducts.map((product, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div>
                    <p className="font-bold">{product.name}</p>
                    <p className="text-gray-400 text-sm">{product.date}</p>
                  </div>
                </TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>{product.orders}</TableCell>
                <TableCell>
                  {product.stock > 0 ? (
                    <Chip color="success" size="sm">
                      In stock
                    </Chip>
                  ) : (
                    <Chip color="danger" size="sm">
                      Out of stock
                    </Chip>
                  )}
                </TableCell>
                <TableCell>${product.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination className="mt-4" initialPage={2} total={5} />
      </div>

      {/* Top Sellers */}
      <div>
        <h2 className="text-xl font-bold mb-4">Top Sellers</h2>
        <Table aria-label="Top Sellers">
          <TableHeader>
            <TableColumn>Seller</TableColumn>
            <TableColumn>Stock</TableColumn>
            <TableColumn>Amount</TableColumn>
            <TableColumn>Progress</TableColumn>
          </TableHeader>
          <TableBody>
            {topSellers.map((seller, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div>
                    <p className="font-bold">{seller.name}</p>
                    <p className="text-gray-400 text-sm">{seller.category}</p>
                  </div>
                </TableCell>
                <TableCell>{seller.stock}</TableCell>
                <TableCell>${seller.amount.toLocaleString()}</TableCell>
                <TableCell>{seller.percentage}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination className="mt-4" initialPage={2} total={5} />
      </div>
    </div>
  );
};

export default BestSellingAndTopSellers;
