import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/Toaster";
import { cn } from "@/lib/utils";

import "@/styles/globals.css";

export const metadata = {
  title: "Ensaa-sm",
  description: "A Reddit clone built with Next.js and TypeScript for ensaa.",
};

export default function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode;
  authModal: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn("bg-white text-slate-900 antialiased light", "")}
    >
      <body className=" bg-slate-50 antialiased" suppressHydrationWarning>
        <Navbar />
        {authModal}
        <div className="w-[80%] z-0 mx-auto pt-[8rem] min-h-screen">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
