import { cookies } from "next/headers";
import NavigationMenuWithActiveItem from "./navigation-menu-04";
import Link from "next/link";
import { Archivo } from "next/font/google";
import Image from "next/image";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

const archivo = Archivo({
    subsets: ['latin'],
})

export default async function NavBar() {

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

    const handleLogout = async () => {
        await fetch('http://localhost:3030/credenciais/logout',
            {
                method: 'POST',
                headers: {
                    'Content-Type': "aplication/json",
                    cookie: cookieList.toString(),
                },
                credentials: "include",
            }
        )
    }

    let data = null;
    if (requestUser.ok) {
        data = await requestUser.json();
    }

    return (
        <div className={archivo.className}>
            <div className="p-4 flex flex-row
            justify-between items-center-safe w-full
            bg-zinc-50 dark:bg-[#18181C]
            ">
                <div className="flex flex-row 
                place-self-center-safe place-items-center-safe">
                    <p className="text-xl p-2">FORTMARKET</p>
                    <NavigationMenuWithActiveItem />
                </div>
                {data ?
                    <div className="flex flex-row 
                    place-items-center-safe
                    ">
                        <div className="flex flex-row 
                        mx-2 my-4
                        justify-between
                        rounded-md
                        bg-[#18181B] dark:bg-[#FFFFFF]
                        text-[#FFFFFF] dark:text-[#18181B]
                        ">
                            <div className="relative size-8">
                                <Image
                                    src={"/Vbucks.svg"}
                                    alt="vbuck icon"
                                    fill
                                    sizes="auto"
                                    style={{
                                        objectFit: "contain"
                                    }}
                                    className="not-dark:invert"
                                />
                            </div>

                            <p className="text-lg">{data.vbucks}</p>
                        </div>
                        <p className="self-center-safe">{data.nome}</p>
                        <Button className="p-2" onClick={handleLogout}><LogOut/></Button>
                    </div> :
                    <Link href={'/login'}>Login</Link>
                }
            </div>
        </div>
    )
}

