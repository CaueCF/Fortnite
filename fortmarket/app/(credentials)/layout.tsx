import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers"
import { redirect } from "next/navigation";
import "./../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FortMarket",
  description: "A loja com tudo que você precisa",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const cookieList = await cookies();

    const requestUser = await fetch('http://localhost:3030/credenciais/data',
        {
            method: 'POST',
            headers: {
                cookie: cookieList.toString(),
            },
            cache: "no-store",
            credentials: "include",
        }
    )

    if(requestUser.ok){
        return redirect('/perfil');
    }
    
    return (
        <html lang="en" className="dark">
              <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
              >
                {children}
              </body>
            </html>
    )
}