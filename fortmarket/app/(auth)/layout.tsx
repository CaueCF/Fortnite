import { cookies } from "next/headers"
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const cookieList = await cookies();

    const hasToken = cookieList.has('token');

    if (!hasToken) {
        return redirect('/login')
    }

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

    //console.log(await requestUser.json());
    
    
    return <>{children}</>
}