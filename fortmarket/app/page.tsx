import { Store } from "@/components/store";
import { Suspense } from "react";

async function getData() {
  const response = await fetch('https://fortnite-api.com/v2/cosmetics/?language=pt-BR', {
    method: 'GET',
  })

  let data = await response.json();
  data = data.data;
  return data;
}

export default async function Home() {

  const data = await getData();

  return (
    <div className="flex min-h-screen 
    items-center justify-center 
    bg-zinc-50 font-sans dark:bg-[#101014]">
      <main className="flex flex-col min-h-screen w-full 
      items-start md:items-center-safe justify-between
      py-12 px-8 
      bg-white dark:bg-[#101014]">
        <Suspense>
          <Store data={data} />
        </Suspense>
      </main>
    </div>
  );
}
