import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Toaster } from "react-hot-toast";

import ReduxProviders from "../lib/Providers";

import { Providers } from "./providers";

import { siteConfig } from "@/src/config/site";

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
            <div className="border">{children}</div>
          </Providers>

          {/* ======================provider end=========== */}
        </ReduxProviders>

        <Toaster />
      </body>
    </html>
  );
}
