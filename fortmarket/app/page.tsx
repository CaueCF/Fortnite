import { Store } from "@/components/store";

export default async function Home() {

  return (
    <div className="flex min-h-screen 
    items-center justify-center 
    bg-zinc-50 font-sans dark:bg-[#101014]">
      <main className="flex flex-col min-h-screen w-full 
      items-start md:items-center-safe justify-between
      py-12 px-8 
      bg-white dark:bg-[#101014]">
        <Store />
      </main>
    </div>
  );
}
