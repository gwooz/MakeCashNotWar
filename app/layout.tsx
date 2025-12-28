import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Make Change, Not War",
  description: "Gamified world map for peaceful contributions"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100" suppressHydrationWarning>
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
