import { Store } from "@/components/store";

export default async function Home() {

  return (
    <div className="flex min-h-screen 
    items-center justify-center 
    bg-zinc-50 font-sans dark:bg-[#101014]">
      <main className="flex min-h-screen w-full 
      flex-col items-center justify-between py-32 px-16 
      bg-white dark:bg-[#101014] sm:items-start">
        <Store />
      </main>
    </div>
  );
}
