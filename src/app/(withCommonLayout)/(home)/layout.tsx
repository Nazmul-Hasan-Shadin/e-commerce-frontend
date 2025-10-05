import { ReactNode } from "react";

// It's often clearer to define an interface for the props
interface HomeLayoutProps {
  children: ReactNode;
  categories: ReactNode; // Corresponds to the @categories folder
  featureProduct: ReactNode; // Corresponds to the @featureProduct folder
  popularProduct: ReactNode; // Corresponds to the @popularProduct folder
  topSellProduct: ReactNode; // Corresponds to the @topSellProduct folder
  BrandingProduct: ReactNode; // Corresponds to the @brandingProduct folder
}

export default function HomeLayout({
  children,
  categories,
  featureProduct,
  popularProduct,
  topSellProduct,
  BrandingProduct,
}: HomeLayoutProps) {
  return (
    <div>
      {/* The main page content will be rendered here */}
      <main>{children}</main>

      {/* The parallel route slots are rendered using their props */}
      {/* They will render the content from the matching @folder/page.tsx or default.tsx */}
      <section>{categories}</section>
      <section>{featureProduct}</section>
      <section>{popularProduct}</section>
      <section>{topSellProduct}</section>
      <section>{BrandingProduct}</section>
    </div>
  );
}