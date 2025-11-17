import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./providers/theme-provider";
import { QueryProvider } from "./providers/QueryProvider";
import {
  ClerkProvider,
  SignedIn,
  UserButton,
} from '@clerk/nextjs'
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/common/sidebar/app-sidebar";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <SidebarProvider>
        <html lang="en">
          <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            {/* <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange> */}
              <QueryProvider>
                <SignedIn>
                    <AppSidebar />
                </SignedIn>
                <div className=" flex items-center justify-center p-6 bg-background">
                  <div className="max-w-md w-full">
                    {children}
                  </div>
                </div>
              </QueryProvider>
            {/* </ThemeProvider> */}
          </body>
        </html>
      </SidebarProvider>
    </ClerkProvider>
  );
}
