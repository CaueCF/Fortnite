import { cookies } from "next/headers";
import NavigationMenuWithActiveItem from "./navigation-menu-04";
import Link from "next/link";
import { Archivo } from "next/font/google";
import LoggedButton from "./logged-button";

const archivo = Archivo({
    subsets: ['latin'],
})

export default async function NavBar() {

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
                <LoggedButton />
            </div>
        </div>
    )
}

