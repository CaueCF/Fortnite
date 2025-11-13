import Image from "next/image";

export default async function Home() {

  const response = await fetch('https://fortnite-api.com/v2/shop/?language=pt-BR', {
    method: 'GET',
  })

  const data = await response.json();
  console.log(data.data.item);


  return (
    <div className="flex min-h-screen 
    items-center justify-center 
    bg-zinc-50 font-sans dark:bg-[#101014]">
      <main className="flex min-h-screen w-full max-w-3xl 
      flex-col items-center justify-between py-32 px-16 
      bg-white dark:bg-[#101014] sm:items-start">
        <div>
          {(data.data.entries).map((item: any) => (
            <p key={item.devname}>{item.brItems}</p>
          ))}
        </div>
      </main>
    </div>
  );
}
