import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-12">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Subscribe Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">
              Subscribe to our Newsletter
            </h3>
            <p className="text-sm text-gray-600">
              Get the latest updates on new products and upcoming sales
            </p>
            <div className="flex items-center space-x-2">
              <Input
                aria-label="Enter your email address"
                placeholder="Enter your email address"
                fullWidth
                className="max-w-[300px]"
              />
              <Button className="bg-orange-500 text-white">Submit</Button>
            </div>
          </div>

          {/* Shop Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#">Electronics</Link>
              </li>
              <li>
                <Link href="#">Computers & Laptops</Link>
              </li>
              <li>
                <Link href="#">Smartphones & Tablets</Link>
              </li>
              <li>
                <Link href="#">Cameras</Link>
              </li>
              <li>
                <Link href="#">Video Games & Systems</Link>
              </li>
              <li>
                <Link href="#">Home Furniture</Link>
              </li>
              <li>
                <Link href="#">Weekly Special</Link>
              </li>
            </ul>
          </div>

          {/* Top Brands */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Top Brands</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#">Coco Lee</Link>
              </li>
              <li>
                <Link href="#">Anna</Link>
              </li>
              <li>
                <Link href="#">French Connection</Link>
              </li>
              <li>
                <Link href="#">Jimmy Choo</Link>
              </li>
              <li>
                <Link href="#">Chanel</Link>
              </li>
              <li>
                <Link href="#">Collette</Link>
              </li>
              <li>
                <Link href="#">View All</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#">Search Terms</Link>
              </li>
              <li>
                <Link href="#">Advanced Search</Link>
              </li>
              <li>
                <Link href="#">Orders and Returns</Link>
              </li>
              <li>
                <Link href="#">Contact Us</Link>
              </li>
              <li>
                <Link href="#">Theme FAQs</Link>
              </li>
              <li>
                <Link href="#">Consultant</Link>
              </li>
              <li>
                <Link href="#">Store Locations</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex justify-between items-center mt-12 border-t border-gray-300 pt-6">
          {/* Contact Information */}
          <div className="space-x-4">
            <address className="text-sm">
              685 Market Street <br />
              San Francisco, CA 94105, USA
            </address>
            <p className="text-sm">
              Call us at <span className="font-bold">(415) 555-5555</span>
            </p>
            <p className="text-sm">
              Email: <span className="font-bold">example@domain.com</span>
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-4 text-lg">
            <Link href="#">
              <i className="fab fa-facebook"></i>
            </Link>
            <Link href="#">
              <i className="fab fa-instagram"></i>
            </Link>
            <Link href="#">
              <i className="fab fa-pinterest"></i>
            </Link>
            <Link href="#">
              <i className="fab fa-twitter"></i>
            </Link>
            <Link href="#">
              <i className="fab fa-snapchat"></i>
            </Link>
          </div>
        </div>

        {/* End-of-season banner */}
        <div className="mt-4 bg-yellow-500 text-center py-2 text-white font-semibold">
          <Link href="#">End-of-season clearance: Up to 80% off!</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
