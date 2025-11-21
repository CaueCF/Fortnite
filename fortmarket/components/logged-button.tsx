'use client'

import { LogOut } from "lucide-react"
import { Button } from "./ui/button"
import Image from "next/image"
import useSWR from "swr"
import { useState } from "react"
import Link from "next/link"

interface FetchError extends Error {
    status: number;
}

export default function LoggedButton() {

    const buttonStyle = `
                    hover:bg-accent hover:text-accent-foreground 
                    focus:bg-accent focus:text-accent-foreground 
                    disabled:pointer-events-none disabled:opacity-50 
                    data-[state=open]:hover:bg-accent 
                    data-[state=open]:text-accent-foreground 
                    data-[state=open]:focus:bg-accent 
                    data-[state=open]:bg-accent/50 
                    focus-visible:ring-ring/50 
                    outline-none 
                    transition-[color,box-shadow] 
                    focus-visible:ring-[3px] 
                    focus-visible:outline-1
                    `


    const [logged, setLogged] = useState<boolean>(false);

    const handleLogout = async () => {
        await fetch('https://fortnite-pcdm-63t8hloa4-caues-projects-301685e3.vercel.app/credenciais/logout',
            {
                method: 'POST',
                headers: {
                    'Content-Type': "aplication/json",
                },
                credentials: "include",
            }
        )
        setLogged(false);
    }

    const fetcher = async (url: any) => {

        const res = await fetch(url, {
            method: 'POST',
            credentials: "include",
        })

        if (!res.ok) {
            const error: FetchError = new Error(`Request failed with status: ${res.status}`) as FetchError;
            error.status = res.status;
            throw error;
        } else {
            setLogged(true);
        }

        return res.json();
    }

    const { data, error, isLoading } = useSWR('https://fortnite-pcdm-63t8hloa4-caues-projects-301685e3.vercel.app/credenciais/data', fetcher,
        {
            revalidateOnFocus: false,
            errorRetryCount: 1,
            onError: () => {
                if (error === 401) return
            }
        }
    );

    if (isLoading) return <p>...</p>
    //console.log(error);
    //if (error) return <p>Erro ao iniciar sessão!</p>
    if (!logged) {
        return (
            <Link href={'/login'}>Login</Link>
        )
    }

    return (
        <div className="flex flex-row 
                    place-items-center-safe
                    gap-2
                    ">
            <div className="flex flex-row 
                        p-1
                        justify-between
                        items-center-safe
                        rounded-md
                        bg-[#18181B] dark:bg-[#FFFFFF]
                        text-[#FFFFFF] dark:text-[#18181B]
                        ">
                <div className="relative size-6 p-2">
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
            <Button
                className={buttonStyle}
                onClick={handleLogout}>
                <LogOut />
            </Button>
        </div>
    )

}