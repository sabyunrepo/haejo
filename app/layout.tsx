import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "변상훈의 AI 부트캠프 — 5명 한정 프라이빗 베타",
  description:
    "비개발자가 자기 손으로 AI 서비스 한 개를 인터넷에 띄우는 2일 완성 부트캠프. 코드를 외우는 대신, AI에게 잘 시키는 법을 배웁니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
