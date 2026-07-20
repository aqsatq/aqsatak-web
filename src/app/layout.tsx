import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "إدارة أقساطك",
  description: "كل أقساطك بمكان واحد",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Almarai:wght@400;700;800&family=Tajawal:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-black1 text-white font-body min-h-screen">{children}</body>
    </html>
  );
}
