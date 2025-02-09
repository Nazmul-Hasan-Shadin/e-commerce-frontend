import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@nextui-org/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/src/config/site";

import ReduxProviders from "../lib/Providers";
import { store } from "../redux/store";
import toast, { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body>
        <ReduxProviders>
          {/* ================provider-start============ */}
          <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
            {children}
          </Providers>

          {/* ======================provider end=========== */}
        </ReduxProviders>

        <Toaster />
      </body>
    </html>
  );
}
