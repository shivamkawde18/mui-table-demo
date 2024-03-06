"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import AntdStyledComponentsRegistry from "./AntdStyledComponentsRegistry";
import { createContext, useState } from "react";
const defaultValue = { setIsLogin: (value: any) => {}, isLogin: null };
export const Context = createContext(defaultValue);
const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLogin, setIsLogin] = useState(null);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Context.Provider value={{ setIsLogin, isLogin }}>
          <AntdStyledComponentsRegistry>
            {children}
          </AntdStyledComponentsRegistry>
        </Context.Provider>
      </body>
    </html>
  );
}
