import type {Metadata} from "next";
// import {Inter} from "next/font/google";
import "@/styles/libsStyle.ts";
// import "@/styles/tailwind.css";
import {MSWComponent} from "@/libs/mocks/config/MSWComponent.client";
import Header from "@/components/common/Header";

export const metadata: Metadata = {
  title: "캐치뷰티",
  description: "캐치뷰티, 고객관리 프로그램",
};
type Props = {
  children: React.ReactNode;
};
export default function RootLayout({children}: Props) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <MSWComponent />
        <Header></Header>
        {children}
      </body>
    </html>
  );
}
