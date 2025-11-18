import { Store } from "@/components/store";
import { Suspense } from "react";

// async function getCosmeticsData() {
//   const response = await fetch('https://fortnite-api.com/v2/cosmetics/?language=pt-BR', {
//     method: 'GET',
//   })

//   let data = await response.json();
//   data = data.data;
//   return data;
// }

// async function getShopData() {
//   const response = await fetch('https://fortnite-api.com/v2/shop/?language=pt-BR', {
//     method: 'GET',
//   })

//   let data = await response.json();
//   data = data.data;
//   return data;
// }

export default async function Home() {

  // const cosmetics = await getCosmeticsData();
  // const shop = await getShopData();

  return (
    <div className="flex min-h-screen 
    items-center justify-center 
    bg-zinc-50 font-sans dark:bg-[#101014]">
      <main className="flex flex-col min-h-screen w-full 
      items-start md:items-center-safe justify-between
      py-12 px-8 
      bg-white dark:bg-[#101014]">
        <Suspense>
          <Store />
        </Suspense>
      </main>
    </div>
  );
}
