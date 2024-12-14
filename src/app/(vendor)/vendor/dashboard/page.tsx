import React from "react";

const page = () => {
  return <div>ho</div>;
};

export default page;

// "use client";

// import React from "react";

// const VendorDashboard = () => {
//   const stats = [
//     {
//       title: "Total Products",
//       value: 120,
//       description: "Number of products listed",
//       icon: "📦",
//     },
//     {
//       title: "Total Sales",
//       value: "$10,500",
//       description: "Sales made this month",
//       icon: "💰",
//     },
//     {
//       title: "Total Profit",
//       value: "$3,500",
//       description: "Profit earned this month",
//       icon: "📈",
//     },
//     {
//       title: "Add Product",
//       value: "",
//       description: "Expand your product line",
//       icon: "➕",
//     },
//   ];

//   return (
//     <div className="p-8 bg-gray-50 min-h-screen">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800">
//         Vendor Dashboard
//       </h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {stats.map((stat, index) => (
//           <div
//             key={index}
//             className="p-6 bg-white rounded-lg shadow hover:shadow-md transform transition-all duration-300 hover:-translate-y-1"
//           >
//             <div className="text-4xl text-[#FD6506] mb-4">{stat.icon}</div>
//             <h2 className="text-lg font-semibold text-gray-700 mb-2">
//               {stat.title}
//             </h2>
//             <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
//             <p className="text-gray-500 text-sm">{stat.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default VendorDashboard;
