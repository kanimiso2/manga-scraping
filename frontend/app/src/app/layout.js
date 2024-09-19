import localFont from "next/font/local";
import "./globals.css";
import Header from './Header';
import Footer from './Footer';
import Appbar from "./appbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        {/* <SessionProvider> */}
        {/* <Appbar /> */}
        <Header /> 
        <main className="flex-1 bg-sky-50">
        
          {children}
        
        </main>
        <Footer /> 
        {/* </SessionProvider> */}
      </body>
    </html>
  );
}
