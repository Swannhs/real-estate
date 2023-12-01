import "./globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
import React from "react";
import MainNav2 from "@/theme-pages/(client-components)/(Header)/MainNav2";

export default function RootLayout({ children, params }: {
  children: React.ReactNode;
  params: any;
}) {
  return (
    <html lang="en">
    <head />
    <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
    {/*<ClientCommons />*/}
    {/*<SiteHeader />*/}
    <MainNav2/>

    {children}

    {/*<FooterNav />*/}
    {/*<Footer />*/}
    </body>
    </html>
  );
}
